import classes from "./LoginForm.module.css";
import { Form } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button>log In</button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
