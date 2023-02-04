import React, { Suspense } from "react";
import { Await, redirect, useLoaderData } from "react-router-dom";
import ManageStudent from "../components/ManageStudent";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../connection/firebase";

const ManageStudentPage = () => {
  const students = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={students}>
          {(loadStudents) => <ManageStudent students={loadStudents} />}
        </Await>
      </Suspense>
      {/* <ManageStudent /> */}
    </>
  );
};

export default ManageStudentPage;

async function loadStudents() {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  let studentData = [];
  const response = await getDocs(collection(db, userData.uid));

  response.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    studentData.push({ id: doc.id, ...doc.data() });
  });
  // console.log(studentData);
  // if (studentData.length === 0) {
  //   throw json(
  //     { message: "Could not fetch events." },
  //     {
  //       status: 500,
  //     }
  //   );
  // } else {
  //   return studentData;
  // }

  return studentData;
}

export function loader() {
  // return defer({
  //   students: loadStudents(),
  // });
  return loadStudents();
}

export async function action({ request, params }) {
  const id = params.id;
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const method = request.method;
  console.log({ id, method });
  try {
    await deleteDoc(doc(db, userData.uid, id));
  } catch (error) {
    console.log(error);
  }
  return redirect("/");
}
