import React, { useEffect, useState } from "react";
import { loadCompany } from "./requests";

export const CompanyDetail = ({ match }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const { companyId } = match.params;
    loadCompany(companyId).then((data) => {
      setCompany(data);
    });
  }, []);

  return !company ? (
    <div>loading</div>
  ) : (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};
