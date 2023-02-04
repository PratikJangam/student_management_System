import React from "react";
import { Link } from "react-router-dom";
import classes from "./StudentDetails.module.css";
const StudentDetails = ({ student }) => {
  console.log(student);
  return (
    <>
      <div className={classes.layout}>
        <div className={classes.wrapper}>
          <ul>
            <li>
              Name:{" "}
              {`${student.firstname} ${student.middlename} ${student.lastname}`}
            </li>
            <li>Class: {student.class}</li>
            <li>Division: {student.div} </li>
            <li>Rool Number: {student.rollno} </li>
            <li>
              Address:{" "}
              {`${student.addressline1} \n ${student.addressline2} ${student.landmark} \n ${student.city} ${student.pincode}`}
            </li>
          </ul>

          <Link to="..">Back</Link>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
