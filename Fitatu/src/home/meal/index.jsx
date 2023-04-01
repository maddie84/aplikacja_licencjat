import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, firestore } from "../../firebase-config/firestore";
import DayGoal from "./daily-goal";
import styles from "./index.module.scss";
import products from "./mock.json";

const Meal = () => {
  const [chosenMeal, setChosenMeal] = useState("");
  return (
    <div className={styles["meal-wrapper"]}>
      <ul className={styles["meals-list"]}>
        {[
          "Śniadanie",
          "Drugie śniadanie",
          "Obiad",
          "Podwieczorek",
          "Kolacja",
        ].map((meal) => (
          <li className={styles["meal-element"]}>
            <div className={styles["single-meal"]}>
              <p>{meal}</p>
              <button
                onClick={() => {
                  setChosenMeal(meal);
                }}
              >
                +
              </button>
            </div>
            {chosenMeal === meal && (
              <ul className={styles["products-list"]}>
                {products.map((product) => (
                  <li className={styles["product"]}>
                    <p>{product.name}</p>
                    <button
                      onClick={async () => {
                        const resp = await getDoc(
                          doc(firestore, "users", auth.currentUser.uid)
                        );
                        if (resp.data()[chosenMeal]) {
                          await updateDoc(
                            doc(firestore, "users", auth.currentUser.uid),
                            {
                              [chosenMeal]: {
                                products: [
                                  ...resp.data()[chosenMeal].products,
                                  {
                                    name: product.name,
                                    kcal: product.kcal,
                                    proteins: product.proteins,
                                    fats: product.fats,
                                    carbs: product.carbs,
                                  },
                                ],
                              },
                              // eaten: {
                              //   kcal: resp.data().eaten.kcal + product.kcal,
                              //   proteins:
                              //     resp.data().eaten.proteins + product.proteins,
                              //   fats: resp.data().eaten.fats + product.fats,
                              //   carbs: resp.data().eaten.carbs + product.carbs,
                              // },
                            }
                          );
                        } else {
                          await updateDoc(
                            doc(firestore, "users", auth.currentUser.uid),
                            {
                              [chosenMeal]: {
                                products: [
                                  {
                                    name: product.name,
                                    kcal: product.kcal,
                                    proteins: product.proteins,
                                    fats: product.fats,
                                    carbs: product.carbs,
                                  },
                                ],
                              },
                              eaten: {
                                kcal: product.kcal,
                                proteins: product.proteins,
                                fats: product.fats,
                                carbs: product.carbs,
                              },
                            }
                          );
                        }
                        await updateDoc(
                          doc(firestore, "users", auth.currentUser.uid),
                          {
                            eaten: {
                              kcal: resp.data()?.eaten.kcal
                                ? resp.data().eaten.kcal + product.kcal
                                : product.kcal,
                              proteins: resp.data()?.eaten.proteins
                                ? resp.data().eaten.proteins + product.proteins
                                : product.proteins,
                              fats: resp.data()?.eaten.fats
                                ? resp.data().eaten.fats + product.fats
                                : product.fats,
                              carbs: resp.data()?.eaten.carbs
                                ? resp.data().eaten.carbs + product.carbs
                                : product.carbs,
                            },
                          }
                        );
                      }}
                    >
                      +
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <DayGoal />
    </div>
  );
};

export default Meal;
