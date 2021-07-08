const db = require("./db");

const Query = {
  company: (root, { id }) => db.companies.get(id),
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  roles: () => db.roles.lis(),
};

const Mutation = {
  // Context is passed into Apollo Server
  createJob: (root, { input }, { user }) => {
    // Check for user auth
    if (!user) {
      throw new Error("Unauthorized");
    }

    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id);
  },
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Mutation, Job, Company };
