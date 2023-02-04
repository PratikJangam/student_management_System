import React from "react";
import classes from "./ManageStudent.module.css";
import Table from "rc-table";

import {
  Link,
  redirect,
  useLoaderData,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../connection/firebase";
import { useEffect } from "react";

const ManageStudent = ({ students }) => {
  // console.log(students);
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const submit = useSubmit();

  let data = [];
  students.map((student) => {
    data.push({
      name: `${student.firstname} ${student.middlename} ${student.lastname}`,
      class: `${student.class}-${student.div}`,
      rollno: student.rollno,
      key: student.id,
      id: student.id,
    });
  });
  // console.log(students);
  // console.log(data);

  async function deleteStudent(id) {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      // submit(null, { method: "delete" });
      try {
        await deleteDoc(doc(db, userData.uid, id));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className={classes.table_wrapper}>
        <div className={classes.table}>
          {/* <Table columns={columns} data={data} /> */}
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll No</th>
            <th>Operation</th>
          </tr>
          {data.map((student) => {
            return (
              <>
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.rollno}</td>
                  <td>
                    <span>
                      <Link to={student.id}>View</Link>/
                      <Link to={`edit/${student.id}`}>Edit</Link>/
                      <button onClick={() => deleteStudent(student.id)}>
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ManageStudent;
