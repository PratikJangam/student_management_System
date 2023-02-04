import React from "react";
import AddStudentNavigation from "../components/AddStudentNavigation";
import StudentForm from "../components/StudentForm";

const AddStudentPage = () => {
  return (
    <>
      <AddStudentNavigation />
      <StudentForm method="post" />
    </>
  );
};

export default AddStudentPage;
