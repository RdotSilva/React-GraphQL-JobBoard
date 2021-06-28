const endpointURL = "http://localhost:9000/graphql";

const loadJobsQuery = `{
  jobs {
      id
      title
      company {
          id
          name
      }
  }
}`;

export const loadJobs = async () => {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: loadJobsQuery,
    }),
  });

  const responseBody = await response.json();
  return responseBody.data.jobs;
};
