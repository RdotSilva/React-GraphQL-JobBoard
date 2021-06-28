const endpointURL = "http://localhost:900/graphql";

export const loadJobs = async () => {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `{
            jobs {
                id
                title
                company {
                    id
                    name
                }
            }
        }`,
    }),
  });

  const responseBody = await response.json();
  return responseBody.data.jobs;
};