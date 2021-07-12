import React, { useEffect, useState } from "react";
import { loadRole } from "./requests";
import { RoleList } from "./RoleList";

export const RoleDetail = ({ match }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const { roleId } = match.params;
    loadRole(roleId).then((data) => {
      setRoles(data);
    });
  }, []);

  return roles ? (
    <div>
      <h1 className="title">Roles</h1>
      <RoleList roles={roles} />
    </div>
  ) : (
    <div>Loading</div>
  );
};
