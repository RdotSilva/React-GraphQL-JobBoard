import React, { useEffect, useState } from "react";

export const RoleDetail = () => {
  const [roles, setRoles] = useState([]);

  return (
    <div>
      <h1 className="title">Roles</h1>
      <p>These are the roles</p>
    </div>
  );
};
