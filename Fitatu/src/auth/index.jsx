import React, { useState } from "react";
import { auth } from "../firebase-config/firestore";
import styles from "./index.module.scss";
import RegisterPopup from "./register-popup";
//import {useHistory, Link} from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "./utils";

// kod, który piszę jest semantyczny co oznacza, że jest przyjazny osobom niepełnosprawnym, które wykorzystują narzędzia
//potrzebne do odczytu ekranu, z którymi nasz kod jest kompatybilny

const Auth = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hasVerificationWentCorrect, setHasVerificationWentCorrect] =
    useState(null);
  const [registerOrLogin, setRegisterOrLogin] = useState("register");
  const navigate = useNavigate();

  const logInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          navigate("/home");
          console.log(userCredential.user);
        }
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
const register = async (e) => {
    e.preventDefault();

    if (validatePassword(password, confirmPassword)) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setHasVerificationWentCorrect(true);
          sendEmailVerification(auth.currentUser);
          navigate("/home");
        })
        .catch((err) => setHasVerificationWentCorrect(false));
    }
  };
return (
    <>
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
            registerOrLogin === "register"
              ? register(e)
              : logInWithEmailAndPassword(e);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }}
          name="registration_form"
          className={styles["form"]}
        >
          <input
            id="email"
            name="email"
placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            className={styles["email"]}
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className={styles["password"]}
          />
          {registerOrLogin === "register" && (
            <>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                placeholder="Confirm password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={styles["confirmPassword"]}
              />
            </>
          )}
          <button type="submit" className={styles["submit"]}>
            Submit
          </button>
        </form>
      </div>
      {typeof hasVerificationWentCorrect === "boolean" && (
        <RegisterPopup
          setHasVerificationWentCorrect={setHasVerificationWentCorrect}
          hasVerificationWentCorrect={hasVerificationWentCorrect}
        />
      )}
    </>
  );
};

export default Auth;