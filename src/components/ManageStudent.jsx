import React from "react";
import classes from "./ManageStudent.module.css";

import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../connection/firebase";

const ManageStudent = ({ students }) => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  let data = [];
  students.map((student) => {
    return data.push({
      name: `${student.firstname} ${student.middlename} ${student.lastname}`,
      class: `${student.class}-${student.div}`,
      rollno: student.rollno,
      key: student.id,
      id: student.id,
    });
  });

  async function deleteStudent(id) {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
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
