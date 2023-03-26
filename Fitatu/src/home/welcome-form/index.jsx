import React, { useContext, useState } from "react";
import Calculations from "./calculations";
import Form from "./form";
import styles from "./index.module.scss";
import Welcome from "./welcome";

const WelcomeForm = () => {
  const [welcomeStep, setWelcomeStep] = useState(0);
  console.log(welcomeStep);
  const getCurrentView = () => {
    switch (welcomeStep) {
      case 0:
        return <Welcome onClick={setWelcomeStep} />;

      case 1:
        return <Form onClick={setWelcomeStep} />;

      case 2:
        return <Calculations />;
    }
  };
  return <div className={styles["welcome-form"]}>{getCurrentView()}</div>;
};

export default WelcomeForm;
