import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadHiringJobs } from "./requests";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadHiringJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
