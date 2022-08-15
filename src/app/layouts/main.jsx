import React from "react";

import useMockData from "../hooks/useMockData";

const Main = () => {
  const { status, progress, error, initialize, clearForm } = useMockData();

  const handleClick = () => {
    clearForm();
    initialize();
  };

  return (
    <div className="container mt-5">
      <div className="p-2">
        <h1>Главная страница</h1>
        <h3>
          Инициализация данных в Firebase{" "}
          <i className="bi bi-fire text-warning" />
        </h3>
        <ul>
          <li>Status: {status}</li>
          <li>Progress: {progress}%</li>
          {error && <li>Error: {error}</li>}
        </ul>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={status === "In Process"}
        >
          Инициализировать
        </button>
      </div>
    </div>
  );
};

export default Main;
