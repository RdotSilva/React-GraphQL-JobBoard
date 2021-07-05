import React, { useState } from "react";
import { createJob } from "./requests";

export const JobForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const companyId = "SJV0-wdOM"; // Temporary hard coded
    const { title, description } = this.state;
    createJob({ companyId, title, description }).then((job) => {
      this.props.history.push(`/jobs/${job.id}`);
    });
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleChange}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
