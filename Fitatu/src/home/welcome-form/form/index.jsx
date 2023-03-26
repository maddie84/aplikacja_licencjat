import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { firestore, auth } from "../../../firebase-config/firestore";
import { doc, setDoc } from "firebase/firestore";
import { Context } from "../../../fit-context";

const Form = ({ onClick }) => {
  const [sex, setSex] = useState("M");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [lifestyle, setLifestyle] = useState("Siedzący");
  const [trainingGoal, setTrainingGoal] = useState("mass");
  const { handleDietCalculations } = useContext(Context);
  const setUserData = async (e) => {
    e.preventDefault();
    await setDoc(doc(firestore, "users", auth.currentUser.uid), {
      sex,
      height,
      weight,
      lifestyle,
      trainingGoal,
    }).then(() => {
      onClick(2);
      handleDietCalculations(weight, lifestyle, trainingGoal);
    });
  };
  return (
    <form
      onSubmit={setUserData}
      name="get-to-know-your-client"
      className={styles["form"]}
    >
      <div className={styles["sex-wrapper"]}>
        <div>
          <label htmlFor="man">Mężczyzna</label>
          <input
            id="man"
            name="man"
            type="checkbox"
            value={sex}
            checked={sex === "M"}
            onChange={() => setSex("M")}
            // className={styles["email"]}
          />
        </div>
        <div>
          <label htmlFor="woman">Kobieta</label>
          <input
            id="woman"
            name="woman"
            type="checkbox"
            value={sex}
            checked={sex === "F"}
            onChange={() => setSex("F")}
          />
        </div>
      </div>
      <input
        id="height"
        name="height"
        type="number"
        autoComplete="off"
        required
        placeholder="Wzrost"
        onChange={(event) => setHeight(event.target.value)}
        className={styles["user-parameters"]}
      />
      <input
        id="weight"
        name="weight"
        type="number"
        autoComplete="off"
        required
        placeholder="Waga"
        onChange={(event) => setWeight(event.target.value)}
        className={styles["user-parameters"]}
      />
      <label htmlFor="lifestyle">Tryb życia:</label>
      <select
        name="lifestyle"
        id="lifestyle"
        value={lifestyle}
        onChange={(event) => setLifestyle(event.target.value)}
      >
        <option value="Siedzący">Siedzący</option>
        <option value="Umierkowanie aktywny">Umiarkowanie aktywny</option>
        <option value="Aktywny">Aktywny</option>
        <option value="Bardzo aktywny">Bardzo aktywny</option>
      </select>
      <div className={styles["training-goal-wrapper"]}>
        <label htmlFor="training-goal">Cel sylwetkowy:</label>
        <div className={styles["goal"]} id="goal" name="goal">
          <div>
            <label htmlFor="mass">Masa</label>
            <input
              id="mass"
              name="mass"
              type="checkbox"
              checked={trainingGoal === "mass"}
              onChange={() => setTrainingGoal("mass")}
              // className={styles["email"]}
            />
          </div>
          <div>
            <label htmlFor="reduction">Redukcja</label>
            <input
              id="reduction"
              name="reduction"
              type="checkbox"
              checked={trainingGoal === "reduction"}
              onChange={() => setTrainingGoal("reduction")}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        //   className={styles["submit"]}
      >
        Nastepny krok
      </button>
    </form>
  );
};

export default Form;
