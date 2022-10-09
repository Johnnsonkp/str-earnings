import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
