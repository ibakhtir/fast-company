import React from "react";

import Uploader from "../components/uploader";

const Main = () => (
  <div className="main-container">
    <section className="main-container__content-block">
      <Uploader />
    </section>
    <section className="main-container__content-block">Users</section>
  </div>
);

export default Main;
