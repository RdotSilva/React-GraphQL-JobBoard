import React from "react";
import { Link } from "react-router-dom";

export const RoleList = ({ roles }) => {
  const renderRole = (role) => {
    const title = role.company
      ? `${role.title} at ${role.company.name}`
      : role.title;
    return (
      <li className="media" key={role.id}>
        <div className="media-content">
          <Link to={`/roles/${role.id}`}>{title}</Link>
        </div>
      </li>
    );
  };

  return <ul className="box">{roles.map((role) => renderRole(role))}</ul>;
};
