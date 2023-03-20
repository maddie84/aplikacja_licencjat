import React, { useState } from "react";
import styles from "./index.module.scss";
import RegisterPopup from "./register-popup";
import { register, logInWithEmailAndPassword } from "./utils";
// kod, który piszę jest semantyczny co oznacza, że jest przyjazny osobom niepełnosprawnym, które wykorzystują narzędzia
//potrzebne do odczytu ekranu, z którymi nasz kod jest kompatybilny

const Auth = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hasVerificationWentCorrect, setHasVerificationWentCorrect] =
    useState(null);
  const [registerOrLogin, setRegisterOrLogin] = useState("register");

  return (
<div className={styles["form-wrapper"]}>
      <div className={styles["buttons-wrapper"]}>
        <button
          className={styles["register-button"]}
          onClick={() => setRegisterOrLogin("register")}
        >
          Register
        </button>
        <button
          className={styles["login-button"]}
          onClick={() => setRegisterOrLogin("login")}
        >
          Login
        </button>
      </div>
      <form
        onSubmit={(e) => {
          registerOrLogin === 'register'?
          register(
            e,
            email,
            password,
            confirmPassword,
            setHasVerificationWentCorrect
          ):logInWithEmailAndPassword(
            e,
            email,
            password
          );
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }}
        name="registration_form"
        className={styles["form"]}
      >
        <label htmlFor="email"> Email </label>
        <input
          id="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          className={styles["email"]}
        />
        <label htmlFor="password"> Password </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          onChange={(event) => setPassword(event.target.value)}
          className={styles["password"]}
        />
{registerOrLogin === "register" && (
          <>
            <label htmlFor="confirmPassword"> Repeat Password </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="off"
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={styles["confirmPassword"]}
            />
          </>
        )}
        <button type="submit" className={styles["submit"]}>
          Submit
        </button>
      </form>
      {typeof hasVerificationWentCorrect === "boolean" && (
        <RegisterPopup
          setHasVerificationWentCorrect={setHasVerificationWentCorrect}
          hasVerificationWentCorrect={hasVerificationWentCorrect}
        />
      )}
    </div>
  );
};

export default Auth;