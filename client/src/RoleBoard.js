import React, { useEffect, useState } from "react";
import { loadRoles } from "./requests";
import { RoleList } from "./RoleList";

export const RoleBoard = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadRoles().then((data) => {
      setRoles(data);
    });
  }, []);

  return roles ? (
    <div>
      <h1 className="title">Role Board</h1>
      <RoleList roles={roles} />
    </div>
  ) : (
    <div>Loading</div>
  );
};
