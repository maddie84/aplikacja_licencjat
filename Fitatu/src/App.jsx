import Auth from "./auth";
import styles from "./index.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";

function App() {
  return (
    <div className={styles["main-wrapper"]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;