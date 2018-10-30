module.exports = {
  githubToken: process.env.PRACTICAL_GITHUB_TOKEN,
  repos: process.env.PRACTICAL_REPOS
    ? process.env.PRACTICAL_REPOS.split(',').map((repo) => repo.split(':'))
    : [],
  user: process.env.PRACTICAL_USER,
  password: process.env.PRACTICAL_PASSWORD,
};
