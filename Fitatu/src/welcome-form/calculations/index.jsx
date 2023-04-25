import { doc, getDoc } from "firebase/firestore";
import { Box, Button, Text } from "grommet";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase-config/firestore";
import { getTranslations } from "../../utils";
import styles from "./index.module.scss";
const Calculations = () => {
  const [recommendations, setRecommendations] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getDoc(doc(firestore, "users", auth.currentUser.uid));
    setRecommendations(data.data().recommendations);
  };

  useLayoutEffect(() => {
    fetchData();
  }, [recommendations]);

  return (
    <Box alignSelf="center">
      <Text alignSelf="center">{getTranslations("recommendations")}</Text>
      <Box
        direction="row"
        gap="10px"
        className={styles["recommendation-wrapper"]}
      >
        <Text>{getTranslations("carbs")}:</Text>
        <Text className={styles["value"]}>{recommendations?.carbs}</Text>
      </Box>
      <Box
        direction="row"
        gap="10px"
        className={styles["recommendation-wrapper"]}
      >
        <Text>{getTranslations("fats")}:</Text>
        <Text className={styles["value"]}>{recommendations?.fats}</Text>
      </Box>
      <Box
        direction="row"
        gap="10px"
        className={styles["recommendation-wrapper"]}
      >
        <Text>{getTranslations("factor")}:</Text>
        <Text className={styles["value"]}>
          {recommendations?.factorOfMassOrReduction}
        </Text>
      </Box>
      <Box
        direction="row"
        gap="10px"
        className={styles["recommendation-wrapper"]}
      >
        <Text>Kcal:</Text>
        <Text className={styles["value"]}>{recommendations?.kcal}</Text>
      </Box>
      <Box
        direction="row"
        gap="10px"
        className={styles["recommendation-wrapper"]}
      >
        <Text>{getTranslations("proteins")}:</Text>
        <Text className={styles["value"]}>{recommendations?.proteins}</Text>
      </Box>
      <Button
        label={getTranslations("submit")}
        onClick={() => navigate("/kalkulator")}
      />
    </Box>
  );
};

export default Calculations;
