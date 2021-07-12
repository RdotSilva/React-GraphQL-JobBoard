import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadRole } from "./requests";

export const RoleDetail = ({ match }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const { roleId } = match.params;
    loadRole(roleId).then((data) => {
      setRole(data);
    });
  }, []);

  return role ? (
    <div>
      <h1 className="title">{role.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${role.company}`}>{role.company}</Link>
      </h2>
      <div className="box">{role.description}</div>
    </div>
  ) : (
    <div>Loading</div>
  );
};
