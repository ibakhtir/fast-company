import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import closeButtonImg from "../assets/x-lg.svg";
import { removeUser } from "../store/users";
import { getProfessionById } from "../store/professions";

const User = ({ user }) => {
  const profession = useSelector(getProfessionById(user.profession));

  const dispatch = useDispatch();

  const handleRemoveUser = () => {
    dispatch(removeUser(user._id));
  };

  return (
    <li className="list-item">
      <div className="list-item__content">
        <img src={user.image} alt="User avatar" />
        <div>
          <h4>{user.name}</h4>
          <p>{profession && profession.name}</p>
        </div>
      </div>
      <img
        src={closeButtonImg}
        className="list-item__action"
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
