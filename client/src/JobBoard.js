import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadHiringJobs } from "./requests";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);

  useEffect(() => {
    loadHiringJobs(showAllJobs).then((data) => {
      setJobs(data);
    });
  }, [showAllJobs]);

  /**
   * Load new jobs and update state when the toggle button is clicked
   */
  const handleToggleChange = () => {
    setShowAllJobs(!showAllJobs);
    loadHiringJobs(showAllJobs).then((data) => {
      setJobs(data);
    });
  };

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <Toggle
        checked={showAllJobs}
        name="jobToggle"
        value={showAllJobs}
        onChange={handleToggleChange}
      />
      <JobList jobs={jobs} />
    </div>
  );
};
