import React, { useState } from "react";
import Calculations from "./calculations";
import FormElement from "./form";
import styles from "./index.module.scss";

const WelcomeForm = ({ step = 0 }) => {
  const [welcomeStep, setWelcomeStep] = useState(step);
  const getCurrentView = () => {
    switch (welcomeStep) {
      case 0:
        return <FormElement onClick={setWelcomeStep} />;

      case 1:
        return <Calculations />;
    }
  };

  return <div className={styles["welcome-form"]}>{getCurrentView()}</div>;
};

export default WelcomeForm;
