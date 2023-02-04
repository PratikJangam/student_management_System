import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("key");

  if (!token) {
    return null;
  }
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
  console.log(token);
  return redirect("/");
}
