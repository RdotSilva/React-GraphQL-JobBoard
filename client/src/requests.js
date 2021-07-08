import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

import { getAccessToken, isLoggedIn } from "./auth";

const endpointURL = "http://localhost:9000/graphql";

// Set up the Apollo Client
const client = new ApolloClient({
  link: new HttpLink({ uri: endpointURL }),
  cache: new InMemoryCache(),
});

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

export const createJob = async (input) => {
  const createJobMutation = `mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { job } = await graphqlRequest(createJobMutation, { input });
  return job;
};

export const loadCompany = async (id) => {
  const loadCompanyQuery = `query CompanyQuery($id: ID!) {company(id: $id) {
    id
    name
    description
    jobs {
      id
      title
      }
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
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  // Check if user logged in and set token header
  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }

  const response = await fetch(endpointURL, request);
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
