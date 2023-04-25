import { Box, Button, CheckBox, Form, Select, Text, TextInput } from "grommet";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { handleDietCalculations } from "./utils";

const FormElement = ({ onClick }) => {
  const [sex, setSex] = useState("M");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [lifestyle, setLifestyle] = useState("Siedzący");
  const [trainingGoal, setTrainingGoal] = useState("mass");

  const setUserData = async (e) => {
    e.preventDefault();

    handleDietCalculations(sex, height, weight, lifestyle, trainingGoal).then(
      () => {
        onClick(1);
      }
    );
  };

  return (
    <>
      <Form
        onSubmit={setUserData}
        name="get-to-know-your-client"
        className={styles["form"]}
      >
        <Box direction="row" gap="20px">
          <CheckBox
            checked={sex === "M"}
            label="Męzczyzna"
            onChange={() => setSex("M")}
          />

          <CheckBox
            label="Kobieta"
            checked={sex === "F"}
            onChange={() => setSex("F")}
          />
        </Box>
        <TextInput
          id="height"
          name="height"
          type="number"
          autoComplete="off"
          required
          placeholder="Wzrost"
          onChange={(event) => setHeight(event.target.value)}
          className={styles["user-parameters"]}
        />
        <TextInput
          id="weight"
          name="weight"
          type="number"
          autoComplete="off"
          required
          placeholder="Waga"
          onChange={(event) => setWeight(event.target.value)}
          className={styles["user-parameters"]}
        />
        <Select
          options={[
            "Siedzący",
            "Umierkowanie aktywny",
            "Aktywny",
            "Bardzo aktywny",
          ]}
          value={lifestyle}
          onChange={(event) => setLifestyle(event.target.value)}
          valueLabel={<span>{lifestyle}</span>}
        />

        <Box direction="row" gap="12px">
          <Text>Cel sylwetkowy:</Text>
          <Box
            className={styles["goal"]}
            id="goal"
            name="goal"
            direction="row"
            gap="12px"
          >
            <Box>
              <CheckBox
                id="mass"
                name="mass"
                type="checkbox"
                checked={trainingGoal === "mass"}
                onChange={() => setTrainingGoal("mass")}
                label="Masa"
              />
            </Box>
            <Box>
              <CheckBox
                id="reduction"
                name="reduction"
                type="checkbox"
                checked={trainingGoal === "reduction"}
                onChange={() => setTrainingGoal("reduction")}
                label="Redukcja"
              />
            </Box>
          </Box>
        </Box>
        <Button label="Nastepny krok" type="submit" />
      </Form>
    </>
  );
};

export default FormElement;
