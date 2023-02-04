import React, { useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./StudentForm.module.css";

import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../connection/firebase";

let isPresent = false;

const StudentForm = ({ method, student }) => {
  const [enteredRollNo, setEnteredRollNo] = useState(null);
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const students = useLoaderData();
  const rollNoChangeHandler = (event) => {
    setEnteredRollNo(event.target.value);
  };
  const submitHandler = () => {
    students.map((student) => {
      if (student.rollno === enteredRollNo) {
        isPresent = true;
      }
    });

    if (isPresent) {
      window.alert("Two students can't have same roll number");
    }
  };

  return (
    <>
      <div className={classes.table_wrapper}>
        <div className={classes.table}>
          <Form method={method} className={classes.form_input}>
            {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
            <div>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="First Name"
                required
                defaultValue={student ? student.firstname : ""}
              />
              <input
                id="middlename"
                name="middlename"
                type="text"
                placeholder="Middle Name"
                required
                defaultValue={student ? student.middlename : ""}
              />
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Last Name"
                required
                defaultValue={student ? student.lastname : ""}
              />
            </div>

            <div>
              <select
                name="class"
                id="class"
                required
                defaultValue={student ? student.class : ""}
              >
                <option value="I">1</option>
                <option value="II">2</option>
                <option value="III">3</option>
                <option value="IV">4</option>
                <option value="V">5</option>
                <option value="VI">6</option>
                <option value="VII">7</option>
                <option value="VIII">8</option>
                <option value="IX">9</option>
                <option value="X">10</option>
                <option value="XI">11</option>
                <option value="XII">12</option>
              </select>

              <select
                name="div"
                id="div"
                placeholder="select"
                required
                defaultValue={student ? student.div : ""}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
              <input
                id="rollno"
                name="rollno"
                type="number"
                required
                placeholder="Enter Roll Number in Digits"
                onChange={rollNoChangeHandler}
                defaultValue={student ? student.rollno : ""}
              />
            </div>

            <div>
              <input
                id="addressline1"
                name="addressline1"
                style={{ width: "45%" }}
                type="text"
                placeholder="Address Line 1"
                required
                defaultValue={student ? student.addressline1 : ""}
              />
              <input
                id="addressline2"
                name="addressline2"
                style={{ width: "45%" }}
                type="text"
                placeholder="Address Line 2"
                required
                defaultValue={student ? student.addressline2 : ""}
              />
            </div>

            <div>
              <input
                id="landmark"
                name="landmark"
                type="text"
                placeholder="Landmark"
                required
                defaultValue={student ? student.landmark : ""}
              />
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                required
                defaultValue={student ? student.city : ""}
              />
              <input
                id="pincode"
                name="pincode"
                type="number"
                placeholder="Pincode"
                required
                defaultValue={student ? student.pincode : ""}
              />
            </div>
            <div>
              <button onClick={submitHandler} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default StudentForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const studentData = {
    firstname: data.get("firstname"),
    middlename: data.get("middlename"),
    lastname: data.get("lastname"),
    class: data.get("class"),
    div: data.get("div"),
    rollno: data.get("rollno"),
    addressline1: data.get("addressline1"),
    addressline2: data.get("addressline2"),
    landmark: data.get("landmark"),
    city: data.get("city"),
    pincode: data.get("pincode"),
  };

  // console.log(studentData);

  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  if (method === "POST") {
    try {
      await setDoc(doc(db, userData.uid, studentData.rollno), {
        ...studentData,
        timeStamp: serverTimestamp(),
      });
      return redirect("/");
    } catch (error) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }
  }

  if (method === "PATCH") {
    const id = params.id;
    console.log(id);
    await updateDoc(doc(db, userData.uid, id), {
      ...studentData,
    });
    return redirect("/manage_students");
  }
}
