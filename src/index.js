import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";

import App from "./app/App";
import history from "./app/utils/history";
import "./app/scss/app.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>
);
