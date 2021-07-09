import React, { useEffect, useState } from "react";
import { loadRoles } from "./requests";

export const RoleDetail = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadRoles().then((data) => {
      setRoles(data);
    });
  }, []);

  return (
    <div>
      <h1 className="title">Roles</h1>
      <p>These are the roles</p>
    </div>
  );
};
