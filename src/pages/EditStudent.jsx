import React from "react";
import { useLoaderData } from "react-router-dom";
import StudentForm from "../components/StudentForm";

const EditStudentPage = () => {
  const data = useLoaderData();
  console.log(data);
  return <StudentForm method="patch" student={data} />;
};

export default EditStudentPage;
