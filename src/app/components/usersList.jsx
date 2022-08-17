import React from "react";
import PropTypes from "prop-types";

import User from "./user";

const UsersList = ({ users }) => (
  <ul className="users-list">
    {users && users.map((user) => <User key={user._id} user={user} />)}
  </ul>
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
  )
};

export default UsersList;
