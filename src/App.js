import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddStudentPage from "./pages/AddStudent";
import EditStudentPage from "./pages/EditStudent";
import ErrorPage from "./pages/Error";

import LoginPage from "./pages/Login";
import ManageStudentPage, {
  loader as studentLoader,
} from "./pages/ManageStudent";
import ManageStudentRootLayout from "./pages/ManageStudentRoot";
import RootLayout from "./pages/Root";
import StudentDetailsPage from "./pages/StudentDetails";
import { action as loginAction, loader as authLoader } from "./pages/Login";
import { action as studentDataManipulateAction } from "./components/StudentForm";
import { action as logoutAction } from "./pages/Logout";
import { loader as studentDetailsLoader } from "./pages/StudentDetails";
import { action as deleteStudentAction } from "./pages/ManageStudent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: authLoader,
    children: [
      {
        index: true,
        element: <AddStudentPage />,
        loader: studentLoader,
        action: studentDataManipulateAction,
      },
      {
        path: "manage_students",
        element: <ManageStudentRootLayout />,

        children: [
          {
            index: true,
            element: <ManageStudentPage />,
            action: deleteStudentAction,
            loader: studentLoader,
          },
          {
            path: ":id",
            id: "student-details",
            loader: studentDetailsLoader,
            element: <StudentDetailsPage />,

            // children: [
            //   {
            //     index: true,
            //   },
            //   // { path: "delete", action: deleteStudentAction },
            // ],
          },
          {
            path: "edit/:id",
            element: <EditStudentPage />,
            loader: studentDetailsLoader,
            action: studentDataManipulateAction,
          },
        ],
      },
      { path: "logout", action: logoutAction },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
