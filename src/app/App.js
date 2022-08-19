import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./layouts/header";
import Main from "./layouts/main";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
