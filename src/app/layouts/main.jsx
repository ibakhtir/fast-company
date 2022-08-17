import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Uploader from "../components/uploader";
import UsersList from "../components/usersList";
import useMockData from "../hooks/useMockData";
import { getUsers, loadUsersList } from "../store/users";

const Main = () => {
  const { status, progress, error, initialize, clearForm } = useMockData();

  const users = useSelector(getUsers());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersList());
  }, [dispatch, status]);

  const handleClick = () => {
    clearForm();
    initialize();
  };

  return (
    <div className="main">
      <section>
        <Uploader
          status={status}
          progress={progress}
          error={error}
          onUpload={handleClick}
        />
      </section>
      <section>
        <UsersList users={users} />
      </section>
    </div>
  );
};

export default Main;
