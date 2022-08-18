import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Preloader from "../components/preloader";
import Uploader from "../components/uploader";
import UsersList from "../components/usersList";
import useMockData from "../hooks/useMockData";
import { loadUsersList, getUsers, getUsersLoadingStatus } from "../store/users";
import { loadProfessionsList } from "../store/professions";
import { loadQualitiesList } from "../store/qualities";

const Main = () => {
  const { status, progress, error, initialize, clearForm } = useMockData();

  const users = useSelector(getUsers());
  const isUsersLoading = useSelector(getUsersLoadingStatus());

  const isDataLoading = status === "In Process";
  const isMessage =
    (users?.length === 0 || users === null) &&
    !isUsersLoading &&
    !isDataLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadProfessionsList());
    dispatch(loadQualitiesList());
  }, [dispatch, status]);

  const handleClick = () => {
    clearForm();
    initialize();
  };

  return (
    <div className="container">
      <div className="main">
        <section className="main__uploader">
          <Uploader
            status={status}
            progress={progress}
            error={error}
            onUpload={handleClick}
          />
        </section>
        <section className="main__users">
          {isDataLoading ? (
            <Preloader />
          ) : (
            <UsersList users={users} isMessage={isMessage} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Main;
