import { doc, getDoc } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { auth, firestore } from "../../../firebase-config/firestore";
import styles from "./index.module.scss";

const DayGoal = () => {
  const [recommendations, setRecommendations] = useState({});
  const [alreadyEaten, setAlreadyEaten] = useState({
    kcal: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  });
  const fetchData = async () => {
    const data = await getDoc(doc(firestore, "users", auth.currentUser.uid));
    setRecommendations(data.data().recommendations);
    data.data()?.eaten && setAlreadyEaten(data.data().eaten);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles["day-goal"]}>
      {Object.entries(recommendations).map(
        (el) =>
          el[0] !== "factorOfMassOrReduction" && (
            <div key={el[0]}>
              <div className={styles["progress-bar"]}>
                <div
                  className={styles["progress"]}
                  style={{
                    width: `${(alreadyEaten[el[0]] / el[1]) * 100}%`,
                  }}
                ></div>
              </div>
              <p className={styles["progress-data"]}>
                {el[0]}: {el[1] - alreadyEaten[el[0]]}
              </p>
            </div>
          )
      )}
    </div>
  );
};

export default DayGoal;
