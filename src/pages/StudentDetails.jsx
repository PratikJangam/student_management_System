import React, { Suspense } from "react";
import StudentDetails from "../components/StudentDetails";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../connection/firebase";
import { Await, json, useRouteLoaderData } from "react-router-dom";

const StudentDetailsPage = () => {
  const student = useRouteLoaderData("student-details");
  // console.log(student);
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={student}>
          {(loadedStudent) => <StudentDetails student={loadedStudent} />}
        </Await>
      </Suspense>
      {/* <StudentDetails /> */}
    </>
  );
};

export default StudentDetailsPage;

async function loadStudent(id) {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userId = userData.uid;

  const docRef = doc(db, userId, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    return docSnap.data();
  }
}

export async function loader({ request, params }) {
  const id = params.id;
  return loadStudent(id);
}
