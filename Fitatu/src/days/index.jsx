import { Box, Button, DataTable, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { getTodayDate, getTranslations } from "../utils";
import styles from "./index.module.scss";
import { fetchData } from "./utils";
const PreviousDays = () => {
  const [chosenDate, setChosenDate] = useState(getTodayDate(1));
  const [lastDayMeals, setLastDayMeals] = useState(null);

  const datesArray = [
    { name: getTodayDate(3) },
    { name: getTodayDate(2) },
    { name: getTodayDate(1) },
  ];

  useEffect(() => {
    fetchData(setLastDayMeals, chosenDate);
  }, [chosenDate]);

  return (
    <Box margin="10px">
      <Box direction="row" justify="center" width="100%">
        <ul className={styles["date-list-wrapper"]}>
          {datesArray.map((date) => {
            return (
              <li key={date.name}>
                <Button
                  label={date.name}
                  onClick={() => setChosenDate(date.name)}
                  plain={
                    !(
                      Number(chosenDate.slice(0, 2)) ===
                      Number(date.name.slice(0, 2))
                    )
                  }
                />
              </li>
            );
          })}
        </ul>
      </Box>
      <ul className={styles["last-day-list"]}>
        {lastDayMeals ? (
          [
            "breakfast",
            "secondBreakfast",
            "dinner",
            "beforeSupper",
            "supper",
          ].map((el) => {
            if (!lastDayMeals?.[el]?.products?.length) return null;
            return (
              <li
                key={`${chosenDate}-${el}`}
                className={styles["meal-wrapper"]}
              >
                <Text className={styles["meal-name"]}>
                  {getTranslations(el)}
                </Text>
                <DataTable
                  className={styles["meal-details"]}
                  columns={[
                    {
                      property: "name",
                      header: <Text>{getTranslations("name")}</Text>,
                    },
                    {
                      property: "kcal",
                      header: <Text>{getTranslations("kcal")}</Text>,
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
                  ]}
                  data={lastDayMeals[el]?.products}
                />
              </li>
            );
          })
        ) : (
          <Text>There is no meals</Text>
        )}
      </ul>
    </Box>
  );
};

export default PreviousDays;
