import { doc, getDoc } from "firebase/firestore";
import { Box, Button, DataTable, Text, TextInput } from "grommet";
import { Add, AddCircle, Trash } from "grommet-icons";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase-config/firestore";
import mock from "../mock.json";
import { getTodayDate, getTranslations } from "../utils";
import DailyGoal from "./daily-goal";
import styles from "./index.module.scss";
import { deleteProduct, filterElements, updateMeal } from "./utils";
const Meal = () => {
  const [recommendations, setRecommendations] = useState({
    kcal: 0,
    carbs: 0,
    proteins: 0,
    fats: 0,
  });
  const [chosenMeal, setChosenMeal] = useState("");
  const [eaten, setEaten] = useState({
    kcal: 0,
    carbs: 0,
    proteins: 0,
    fats: 0,
  });
  const [products, setProducts] = useState(mock);
  const [grammage, setGrammage] = useState(1);
  const [meals, setMeals] = useState({
    breakfast: null,
    secondBreakfast: null,
    dinner: null,
    beforeSupper: null,
    supper: null,
  });

  const fetchData = async () => {
    const resp = (
      await getDoc(doc(firestore, "users", localStorage.getItem("uid")))
    ).data();

    const { recommendations } = resp;

    recommendations && setRecommendations(recommendations);
    if (resp?.[getTodayDate()]) {
      const {
        breakfast,
        secondBreakfast,
        dinner,
        beforeSupper,
        supper,
        eaten,
      } = resp?.[getTodayDate()];

      setMeals({
        breakfast: breakfast ?? null,
        secondBreakfast: secondBreakfast ?? null,
        dinner: dinner ?? null,
        beforeSupper: beforeSupper ?? null,
        supper: supper ?? null,
      });
      eaten && setEaten(eaten);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles["meal-wrapper"]}>
      <ul className={styles["meals-list"]}>
        {Object.entries(meals)?.map(([key, value]) => {
          return (
            <li key={key} className={styles["meal-element"]}>
              <Box
                direction="row"
                align="center"
                justify="between"
                width="220px"
              >
                <Text className={styles["meal-name"]}>
                  {getTranslations(key)}
                </Text>
                <Button
                  onClick={() => {
                    setChosenMeal(key);
                  }}
                  icon={<Add />}
                ></Button>
              </Box>
              {chosenMeal === key && (
                <Box direction="row" justify="evenly" margin="0 0 0 20px">
                  <Box width="60%">
                    <TextInput
                      placeholder={getTranslations("product name")}
                      onChange={({ target: { value } }) =>
                        filterElements(mock, value, setProducts)
                      }
                      width="auto"
                    />
                    <Box className={styles["products-list"]}>
                      <DataTable
                        columns={[
                          {
                            property: "name",
                            header: <Text>{getTranslations("name")}</Text>,
                            primary: true,
                          },
                          {
                            property: "kcal",
                            header: <Text>Kcal</Text>,
                          },
                          {
                            property: "carbs",
                            header: <Text>{getTranslations("carbs")}</Text>,
                          },
                          {
                            property: "proteins",
                            header: <Text>{getTranslations("proteins")}</Text>,
                          },
                          {
                            property: "fats",
                            header: <Text>{getTranslations("fats")}</Text>,
                          },
                          {
                            property: "",
                            header: <Text>{getTranslations("grammage")}</Text>,
                            render: (product) => {
                              return (
                                <Box
                                  direction="row"
                                  key={`${products.name - product.kcal}`}
                                >
                                  <TextInput
                                    placeholder="g"
                                    type="number"
                                    value={grammage * 100}
                                    onChange={({ target: { value } }) => {
                                      value && setGrammage(value / 100);
                                    }}
                                  />
                                  <Button
                                    onClick={() => {
                                      updateMeal(
                                        product,
                                        grammage,
                                        chosenMeal,
                                        setEaten,
                                        setMeals
                                      );
                                    }}
                                    icon={<AddCircle />}
                                  ></Button>
                                </Box>
                              );
                            },
                          },
                        ]}
                        data={products}
                      />
                    </Box>
                  </Box>
                  <DataTable
                    className={styles["eaten-products-list"]}
                    columns={[
                      {
                        property: "name",
                        header: (
                          <Text className={styles["eaten-products-header"]}>
                            Zjedzone dziś na {getTranslations(chosenMeal)}
                          </Text>
                        ),
                        render: (product) => {
                          return (
                            <Box direction="row" align="center">
                              <Text>{product.name}</Text>

                              <Button
                                icon={<Trash />}
                                onClick={() =>
                                  deleteProduct(
                                    meals[chosenMeal].products,
                                    chosenMeal,
                                    product,
                                    setEaten,
                                    setMeals
                                  )
                                }
                              ></Button>
                            </Box>
                          );
                        },
                      },
                    ]}
                    data={value?.products}
                  />
                </Box>
              )}
            </li>
          );
        })}
      </ul>
      <DailyGoal eaten={eaten} recommendations={recommendations} />
    </div>
  );
};

export default Meal;
