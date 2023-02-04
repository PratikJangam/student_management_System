import React from "react";
import { Outlet } from "react-router-dom";
import ManageStudentNavigation from "../components/ManageStudentNavigation";

const ManageStudentRootLayout = () => {
  return (
    <>
      <ManageStudentNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ManageStudentRootLayout;
