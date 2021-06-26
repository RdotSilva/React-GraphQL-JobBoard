import React, { useState, useEffect } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./requests";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(async () => {
    const newJobs = await loadJobs();

    setJobs(newJobs.data);
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
