import Auth from "./auth";
import styles from "./index.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import FitContext from "./fit-context";

function App() {
  return (
    <div className={styles["main-wrapper"]}>
      <FitContext>
        <Router>
          <Routes>
            <Route exact path="/" element={<Auth />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </Router>
      </FitContext>
    </div>
  );
}

export default App;