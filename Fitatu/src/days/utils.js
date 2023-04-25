import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase-config/firestore";

export const fetchData = async (setLastDayMeals, chosenDate) => {
  const currentUserDoc = doc(firestore, "users", localStorage.getItem("uid"));
  const dataBaseResponse = (await getDoc(currentUserDoc))?.data();

  setLastDayMeals(dataBaseResponse[chosenDate]);
};
