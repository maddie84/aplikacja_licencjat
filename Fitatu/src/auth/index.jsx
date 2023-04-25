import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Box, Button, Form, FormField, Text, TextInput } from "grommet";
import { Lock, Mail } from "grommet-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase-config/firestore";
import { getTranslations } from "../utils";
import styles from "./index.module.scss";
import { validatePassword } from "./utils";

// kod, który piszę jest semantyczny co oznacza, że jest przyjazny osobom niepełnosprawnym, które wykorzystują narzędzia
//potrzebne do odczytu ekranu, z którymi nasz kod jest kompatybilny

const Auth = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [hasVerificationWentCorrect, setHasVerificationWentCorrect] =
  //   useState(null);
  const [registerOrLogin, setRegisterOrLogin] = useState("register");
  const navigate = useNavigate();

  const logInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      const currentUserDoc = doc(firestore, "users", auth.currentUser.uid);
      const resp = (await getDoc(currentUserDoc)).data();
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        // Signed in
        localStorage.setItem("uid", auth.currentUser.uid);
        console.log(localStorage.setItem("uid", auth.currentUser.uid));
        resp ? navigate("/kalkulator") : navigate("/przywitanie");
      });
    } catch (err) {
      alert(err.message);
    }
  };
  const register = async (e) => {
    e.preventDefault();

    if (validatePassword(password, confirmPassword)) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // setHasVerificationWentCorrect(true);
          sendEmailVerification(auth.currentUser);
          navigate("/przywitanie");
          localStorage.setItem("uid", auth.currentUser.uid);
        })
        .catch((err) => {
          // setHasVerificationWentCorrect(false)
        });
    }
  };

  const setInputsValues = (loginOrRegister) => {
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setRegisterOrLogin(loginOrRegister);
  };
  return (
    <>
      <Form
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
        <FormField>
          <Text alignSelf="center" margin="0 0 10px 0">
            {getTranslations(registerOrLogin)}
          </Text>
          <Box background="background-contrast" width="medium" fill>
            <TextInput
              id="email"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className={styles["email"]}
              icon={<Mail />}
              reverse
              value={email}
            />
          </Box>
        </FormField>
        <FormField>
          <Box background="background-contrast" width="medium" fill>
            <TextInput
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              placeholder={getTranslations("password")}
              onChange={(event) => setPassword(event.target.value)}
              className={styles["password"]}
              icon={<Lock />}
              reverse
              value={password}
            />
          </Box>
        </FormField>

        {registerOrLogin === "register" && (
          <FormField>
            <Box background="background-contrast" width="medium" fill>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                placeholder={getTranslations("confirm password")}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={styles["confirmPassword"]}
                icon={<Lock />}
                reverse
                value={confirmPassword}
              />
            </Box>
          </FormField>
        )}
        <Box align="center">
          <Button
            primary
            type="submit"
            className={styles["submit"]}
            label={getTranslations("submit")}
          />
        </Box>
      </Form>
      <Box
        className={styles["buttons-wrapper"]}
        flex
        direction="row"
        justify="around"
        gap="40px"
      >
        <Box>
          <Button
            className={styles["register-button"]}
            onClick={() => setInputsValues("register")}
            label={getTranslations("register")}
          />
        </Box>
        <Button
          className={styles["login-button"]}
          onClick={() => setInputsValues("login")}
          label={getTranslations("login")}
        />
      </Box>
      {/* {typeof hasVerificationWentCorrect === "boolean" && (
        <RegisterPopup
          setHasVerificationWentCorrect={setHasVerificationWentCorrect}
          hasVerificationWentCorrect={hasVerificationWentCorrect}
        />
      )} */}
    </>
  );
};

export default Auth;
