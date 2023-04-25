import React from "react";
import { useLocation } from "react-router-dom";
import Auth from "./auth";
import PreviousDays from "./days";
import Meal from "./meal";
import Navigation from "./nav";
import WelcomeForm from "./welcome-form";

const Wrapper = () => {
  const { pathname } = useLocation();

  const getRouteElement = () => {
    switch (pathname) {
      case "/":
        return <Auth />;
      case "/przywitanie":
        return <WelcomeForm />;
      case "/twojProfil":
        return <WelcomeForm step={0} />;
      case "/kalkulator":
        return <Meal />;
      case "/historia":
        return <PreviousDays />;
    }
  };

  return (
    <>
      {!["/", "/welcomeForm"].includes(pathname) && <Navigation />}
      <main>{getRouteElement()}</main>
    </>
  );
};

export default Wrapper;
