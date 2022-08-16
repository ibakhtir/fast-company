import React from "react";

import useMockData from "../hooks/useMockData";

const Uploader = () => {
  const { status, progress, error, initialize, clearForm } = useMockData();

  const handleClick = () => {
    clearForm();
    initialize();
  };

  return (
    <div className="uploader">
      <h2>Инициализация данных в Firebase</h2>
      <ul className="uploader__list">
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button
        type="button"
        className="uploader__button"
        onClick={handleClick}
        disabled={status === "In Process"}
      >
        Инициализировать
      </button>
    </div>
  );
};

export default Uploader;
