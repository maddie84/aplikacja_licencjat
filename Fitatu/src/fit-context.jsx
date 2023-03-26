import React, { createContext, useState } from "react";
import { firestore, auth } from "./firebase-config/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";
export const Context = createContext({
  handleDietCalculations: () => {},
  recomendations: {},
});

const FitContext = ({ children }) => {
  const [recomendations, setRecomendations] = useState({});
  const handleDietCalculations = async (weight, lifestyle, trainingGoal) => {
    const isItMassGoal = trainingGoal === "mass";
    let multiplierDependsOfLifestyle;
    const factorOfMassOrReduction = isItMassGoal
      ? (0.005 * weight) / 4
      : (0.02 * weight) / 4; //waga na + lub - tygodniowo
    const deficitOrSurplus = factorOfMassOrReduction * 1000;
    switch (lifestyle) {
      case "Siedzący":
        multiplierDependsOfLifestyle = 1.4;
        break;
      case "Umierkowanie aktywny":
        multiplierDependsOfLifestyle = 1.6;
        break;
      case "Aktywny":
        multiplierDependsOfLifestyle = 1.8;
        break;
      case "Bardzo aktywny":
        multiplierDependsOfLifestyle = 2;
        break;
    }
    const kcal = isItMassGoal
      ? Math.trunc(
          weight * 22 * multiplierDependsOfLifestyle + deficitOrSurplus
        )
      : Math.trunc(
          weight * 22 * multiplierDependsOfLifestyle - deficitOrSurplus
        );
    const proteins = isItMassGoal
      ? Math.trunc(weight * 2)
      : Math.trunc(weight * 2.5); //w gramach
    const fats = isItMassGoal
      ? Math.trunc((kcal * 0.3) / 9)
      : Math.trunc((kcal * 0.2) / 9); //w gramach
    const carbs = Math.trunc((kcal - (proteins * 4 + fats * 9)) / 4); //w gramach
    await updateDoc(doc(firestore, "users", auth.currentUser.uid), {
      recomendations: {
        kcal,
        factorOfMassOrReduction,
        proteins,
        fats,
        carbs,
      },
    }).then(() => {
      setRecomendations({
        kcal,
        factorOfMassOrReduction,
        proteins,
        fats,
        carbs,
      });
    });
  };
  return (
    <Context.Provider value={{ handleDietCalculations, recomendations }}>
      {children}
    </Context.Provider>
  );
};

export default FitContext;
