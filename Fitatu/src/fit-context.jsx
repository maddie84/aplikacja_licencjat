import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { auth, firestore } from "./firebase-config/firestore";
export const Context = createContext({
  handleDietCalculations: () => {},
  recommendations: {},
});

const FitContext = ({ children }) => {
  const [recommendations, setRecommendations] = useState({});
  const handleDietCalculations = async (
    weight,
    lifestyle,
    trainingGoal,
    setNextPage
  ) => {
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
      recommendations: {
        kcal,
        factorOfMassOrReduction,
        proteins,
        fats,
        carbs,
      },
    }).then(() => {
      setRecommendations({
        kcal,
        factorOfMassOrReduction,
        proteins,
        fats,
        carbs,
      });
      setNextPage(2);
    });
  };
  return (
    <Context.Provider value={{ handleDietCalculations, recommendations }}>
      {children}
    </Context.Provider>
  );
};

export default FitContext;
