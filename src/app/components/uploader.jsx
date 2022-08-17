import React from "react";
import PropTypes from "prop-types";

const Uploader = ({ status, progress, error, onUpload }) => (
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
      onClick={() => onUpload()}
      disabled={status === "In Process"}
    >
      Инициализировать
    </button>
  </div>
);

Uploader.propTypes = {
  status: PropTypes.string,
  progress: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onUpload: PropTypes.func
};

export default Uploader;
