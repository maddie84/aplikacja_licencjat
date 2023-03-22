import classNames from "classnames";
import React, { useEffect } from "react";
import styles from "./index.module.scss";

const RegisterPopup = ({
  setHasVerificationWentCorrect,
  hasVerificationWentCorrect,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setHasVerificationWentCorrect(null);
    }, 2300);
  }, []);

  return (
    <div className={styles.popup}>
      {hasVerificationWentCorrect ? (
        <span
          className={classNames(styles["icon"], "material-symbols-outlined")}
        >
          error
        </span>
      ) : (
        <span
          className={classNames(styles["icon"], "material-symbols-outlined")}
        >
          done_outline
        </span>
      )}
      <p className={styles["text"]}>
        {hasVerificationWentCorrect
          ? "Zostałeś zarejestrowany"
          : "Coś poszło nie tak"}
      </p>
    </div>
  );
};

export default RegisterPopup;