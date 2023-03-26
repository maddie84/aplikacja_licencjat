import React, { createContext, useState } from "react";
export const Context = createContext({
  handleDietCalculations: () => {},
});

const FitContext = ({ children }) => {
  const handleDietCalculations = (weight, lifestyle, trainingGoal) => {
    const isItMassGoal = trainingGoal === "mass";
    let multiplierDependsOfLifestyle;
    const factorOfMassOrReduction = isItMassGoal
      ? (0.005 * weight) / 4
      : (0.02 * weight) / 4; //waga na + lub - tygodniowo
    console.log(factorOfMassOrReduction);
    const deficitOrSurplus = factorOfMassOrReduction * 1000;
    console.log(deficitOrSurplus);
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
    if (isItMassGoal) {
      const kcal =
        weight * 22 * multiplierDependsOfLifestyle + deficitOrSurplus;
      console.log(kcal);
    } else {
      const kcal =
        weight * 22 * multiplierDependsOfLifestyle - deficitOrSurplus;
      console.log(kcal);
    }
  };
  return (
    <Context.Provider value={{ handleDietCalculations }}>
      {children}
    </Context.Provider>
  );
};

export default FitContext;
