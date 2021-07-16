import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import gql from "graphql-tag";
import { getAccessToken, isLoggedIn } from "./auth";

const endpointURL = "http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward) => {
  // Check if user logged in and set token header
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: "Bearer " + getAccessToken(),
      },
    });
  }
  return forward(operation);
});

// Set up the Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache(),
});

export const loadJobs = async () => {
  const {
    data: { jobs },
  } = await client.query({ query: loadJobsQuery, fetchPolicy: "no-cache" }); // Set no cache fetch to always get job data on reload

  return jobs;
};

export const loadHiringJobs = async () => {
  const {
    data: { jobsHiring },
  } = await client.query({
    query: jobsHiringQuery,
    variables: {
      hiringToggle: "true", // Hard coded for now
    },
  });

  return jobsHiring;
};

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }
`;

const companyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

const jobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }
`;

const jobsHiringQuery = gql`
  query JobsQuery($hiringToggle: Boolean) {
    jobsHiring(hiringToggle: $hiringToggle) {
      id
      hiring
      title
      company {
        id
        name
      }
    }
  }
`;

const loadJobsQuery = gql`
  {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

export const createJob = async (input) => {
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });

  return job;
};

export const loadCompany = async (id) => {
  const {
    data: { company },
  } = await client.query({ query: companyQuery, variables: { id } });

  return company;
};

export const loadJob = async (id) => {
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { id } });

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

export const loadRoles = async () => {
  const query = gql`
    {
      roles {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;

  const {
    data: { roles },
  } = await client.query({ query });

  return roles;
};

export const loadRole = async (id) => {
  const query = gql`
    query RoleQuery($id: ID!) {
      role(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;

  const {
    data: { role },
  } = await client.query({ query, variables: { id } });

  return role;
};
