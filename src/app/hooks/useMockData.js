/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { useEffect, useState } from "react";

import httpService from "../services/http.service";
import professions from "../mock/professions.json";
import qualities from "../mock/qualities.json";
import users from "../mock/users.json";

const statusConsts = {
  idle: "Not Started",
  pending: "In Process",
  successed: "Ready",
  error: "Error occurred"
};

const useMockData = () => {
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  const totalCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  useEffect(() => {
    const updateProgress = () => {
      if (count !== 0 && status === statusConsts.idle) {
        setStatus(statusConsts.pending);
      }
      const newProgress = Math.floor((count / totalCount) * 100);
      if (progress < newProgress) {
        setProgress(() => newProgress);
      }
      if (newProgress === 100) {
        setStatus(statusConsts.successed);
      }
    };

    updateProgress();
  }, [status, progress, count, totalCount]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put(`profession/${prof._id}`, prof);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user);
        incrementCount();
      }
      for (const qual of qualities) {
        await httpService.put(`quality/${qual._id}`, qual);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  const clearForm = () => {
    setStatus(statusConsts.idle);
    setProgress(0);
    setCount(0);
    setError(null);
  };

  return { status, progress, error, initialize, clearForm };
};

export default useMockData;
