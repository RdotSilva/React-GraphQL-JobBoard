import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadHiringJobs } from "./requests";
import Toggle from "react-toggle";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);

  useEffect(() => {
    loadHiringJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <Toggle
        checked={showAllJobs}
        name="jobToggle"
        value={showAllJobs}
        onChange={() => setShowAllJobs(!showAllJobs)}
      />
      <JobList jobs={jobs} />
      // TODO: Filter out jobs that are not hiring
    </div>
  );
};
