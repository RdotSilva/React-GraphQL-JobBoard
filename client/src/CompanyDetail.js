import React, { useEffect, useState } from "react";
import { loadCompany } from "./requests";
import { JobList } from "./JobList";

export const CompanyDetail = ({ match }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const { companyId } = match.params;
    loadCompany(companyId).then((data) => {
      setCompany(data);
    });
  }, [match.params]);

  return !company ? (
    <div>loading</div>
  ) : (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
};
