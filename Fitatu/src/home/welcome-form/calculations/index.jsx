import React, { useContext } from "react";
import { Context } from "../../../fit-context";

const Calculations = () => {
  const { recomendations } = useContext(Context);
  console.log(recomendations);
  return <div>Calculations</div>;
};

export default Calculations;
