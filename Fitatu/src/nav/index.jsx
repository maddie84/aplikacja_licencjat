import React from "react";
import styles from "./index.module.scss";

import { Box, Button, Nav, Text } from "grommet";
import { useNavigate } from "react-router-dom";
import { getTranslations } from "../utils";

const Navigation = () => {
  const navigation = useNavigate();
  return (
    <Nav
      direction="row"
      height="80px"
      flex
      justify="between"
      className={styles["nav"]}
    >
      <Box direction="row">
        {["Twój Profil", "Kalkulator", "Historia"].map((label) => (
          <Button
            plain
            key={label}
            hoverIndicator
            onClick={async (e) => {
              e.preventDefault();
              navigation(`/${getTranslations(label)}`);
            }}
          >
            <Box
              pad={{ horizontal: "large", vertical: "medium" }}
              direction="row"
              gap="8px"
            >
              <Text
                size="medium"
                color="var(--color-dr-white)"
                className={styles["navigation-text"]}
              >
                {label}
              </Text>
            </Box>
          </Button>
        ))}
      </Box>
    </Nav>
  );
};

export default Navigation;
