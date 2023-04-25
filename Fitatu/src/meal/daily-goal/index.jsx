import { Box, Meter, Stack, Text } from "grommet";
import React from "react";
import { getTranslations } from "../../utils";
import styles from "./index.module.scss";

const DailyGoal = ({ eaten, recommendations }) => {
  return (
    <Box
      className={styles["daily-goal"]}
      direction="row"
      background="var(--color-fit-white)"
      height="32px"
      gap="12px"
      width="100%"
    >
      <ul className={styles["proteins-details"]}>
        {["kcal", "proteins", "carbs", "fats"].map(
          (el) =>
            el[0] !== "factorOfMassOrReduction" && (
              <Box
                direction="row"
                alignSelf="center"
                margin="0 12px"
                className={styles["daily-goal-element"]}
              >
                <Text className={styles["daily-detail-text"]}>
                  {getTranslations(el)}
                </Text>
                <Stack>
                  <Text className={styles["bar-text"]}>
                    {eaten[el]} / {recommendations[el]}
                  </Text>
                  <Meter
                    key={el}
                    round
                    className={styles["meter"]}
                    values={[
                      {
                        value: `${(eaten[el] / recommendations[el]) * 100}`,
                        color: "var(--color-fit-orange)",
                        highlight: true,
                      },
                    ]}
                  />
                </Stack>
              </Box>
            )
        )}
      </ul>
    </Box>
  );
};

export default DailyGoal;
