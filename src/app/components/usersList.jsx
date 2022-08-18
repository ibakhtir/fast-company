import React from "react";
import PropTypes from "prop-types";

import User from "./user";

const UsersList = ({ users, isMessage }) => (
  <div className="users">
    {!isMessage ? (
      <ul className="users__list">
        {users && users.map((user) => <User key={user._id} user={user} />)}
      </ul>
    ) : (
      <p className="users__message">В Firebase нет данных о пользователях</p>
    )}
  </div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array
      ])
    )
  ),
  isMessage: PropTypes.bool
};

export default UsersList;
