import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadRoles } from "./requests";

export const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadRoles().then((data) => {
      setRoles(data);
    });
  }, []);

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
