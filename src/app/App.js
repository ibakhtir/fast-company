import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </>
  );
}

export default App;
