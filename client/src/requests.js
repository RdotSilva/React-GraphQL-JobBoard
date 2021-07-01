const endpointURL = "http://localhost:9000/graphql";

export const loadJobs = async () => {
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

  const { jobs } = await graphqlRequest(loadJobsQuery);
  return jobs;
};

export const loadCompany = async (id) => {
  const loadCompanyQuery = `query CompanyQuery($id: ID!) {company(id: $id) {
    id
    name
    description
  	}
  }`;

  const { company } = await graphqlRequest(loadCompanyQuery, { id });
  return company;
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

  // Error handling
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }

  return responseBody.data;
};
