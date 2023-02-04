import React from "react";
import { Form, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <>
      <header className={classes.navbar}>
        <h1>LOGO</h1>
        <div>
          <p>{userData.email}</p>
        </div>
      </header>
      <div className={classes.sidebar}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Add Student
        </NavLink>

        <NavLink
          to="/manage_students"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Manage Students
        </NavLink>

        <Form action="/logout" method="post">
          <button>Logout</button>
        </Form>
      </div>
    </>
  );
};

export default MainNavigation;
