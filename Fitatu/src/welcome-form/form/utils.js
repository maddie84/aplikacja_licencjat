import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase-config/firestore";

export const handleDietCalculations = async (
  sex,
  height,
  weight,
  lifestyle,
  trainingGoal
) => {
  const currentUserDoc = doc(firestore, "users", localStorage.getItem("uid"));
  const resp = (await getDoc(currentUserDoc)).data();
  await setDoc(doc(firestore, "users", localStorage.getItem("uid")), {
    sex,
    height,
    weight,
    lifestyle,
    trainingGoal,
  });

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
    ? weight * 22 * multiplierDependsOfLifestyle + deficitOrSurplus
    : weight * 22 * multiplierDependsOfLifestyle - deficitOrSurplus;

  const proteins = isItMassGoal ? weight * 2 : weight * 2.5; //w gramach
  const fats = isItMassGoal ? (kcal * 0.3) / 9 : (kcal * 0.2) / 9; //w gramach
  const carbs = (kcal - (proteins * 4 + fats * 9)) / 4; //w gramach

  await updateDoc(doc(firestore, "users", localStorage.getItem("uid")), {
    ...resp,
    recommendations: {
      kcal: Math.trunc(kcal),
      factorOfMassOrReduction,
      proteins: Math.trunc(proteins),
      fats: Math.trunc(fats),
      carbs: Math.trunc(carbs),
    },
  });
};
