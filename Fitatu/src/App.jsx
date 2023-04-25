import { Grommet } from "grommet";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { config } from "./grommet";
import styles from "./index.module.scss";
import Wrapper from "./wrapper";

function App() {
  return (
    <div className={styles["main-wrapper"]}>
      <Grommet theme={config}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Wrapper />} />
            <Route exact path="/przywitanie" element={<Wrapper />} />
            <Route exact path="/kalkulator" element={<Wrapper />} />
            <Route exact path="/twojProfil" element={<Wrapper />} />
            <Route exact path="/historia" element={<Wrapper />} />
          </Routes>
        </Router>
      </Grommet>
    </div>
  );
}

export default App;
