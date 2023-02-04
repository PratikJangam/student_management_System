import React from "react";

import LoginForm from "../components/LoginForm";
import { auth } from "../connection/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  signInWithEmailAndPassword(auth, authData.email, authData.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // console.log(user);
      // const setUser = JSON.parse(user);
      localStorage.setItem("user", JSON.stringify(user));
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return redirect("/");
}

export function loader() {
  const user = localStorage.getItem("user");
  // console.log(user);
  if (!user) {
    return redirect("/login");
  }

  return null;
}
