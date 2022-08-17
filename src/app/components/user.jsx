import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import closeButtonImg from "../assets/x-lg.svg";
import { removeUser } from "../store/users";

const User = ({ user }) => {
  const dispatch = useDispatch();

  const handleRemoveUser = () => {
    dispatch(removeUser(user._id));
  };

  return (
    <li className="users-list__item">
      <div className="users-list__content">
        <img src={user.image} alt="User avatar" />
        <div>
          <h4>{user.name}</h4>
          <p>Профессия</p>
        </div>
      </div>
      <img
        src={closeButtonImg}
        className="users-list__action"
        aria-hidden="true"
        alt="Close button"
        onClick={handleRemoveUser}
      />
    </li>
  );
};

User.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array
    ])
  )
};

export default User;
