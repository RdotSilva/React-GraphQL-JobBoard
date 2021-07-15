const db = require("./db");

const Query = {
  company: (root, { id }) => db.companies.get(id),
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  jobsHiring:
    () =>
    (root, { hiring }) =>
      db.jobs.find((a) => a.hiring == hiring),
  roles: () => db.roles.list(),
  role: (root, { id }) => db.roles.get(id),
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

const Role = {
  company: (role) => db.companies.get(role.companyId),
};

module.exports = { Query, Mutation, Job, Company, Role };
