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

export const loadJob = async (id) => {
  const loadJobQuery = `query JobQuery($id: ID!) {
    job(id: $id) {
        id
        title
        company {
            id
            name
        }
      description
    }
  }`;

  const { job } = await graphqlRequest(loadJobQuery, { id });
  return job;
};

/**
 *
 * @param {*} query GraphQL query
 * @param {*} variables GraphQL variables
 * @returns
 */
const graphqlRequest = async (query, variables = {}) => {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseBody = await response.json();
  return responseBody.data;
};
