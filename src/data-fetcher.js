const parsePRs = (response) =>
  response.repository.pullRequests.edges.map(({ node }) => ({
    ...node,
    labels: node.labels.edges.map((n) => n.node.name),
    reviews: node.reviews.edges.map((n) => n.node.state),
    repository: response.repository.name,
    repositoryUrl: response.repository.url,
  }));

const getPRsForRepo = (client, owner, name) => {
  const query = `query($name: String!, $owner: String!){
      repository(owner: $owner, name: $name) {
        name
        url
        pullRequests(last:20, states:OPEN) {
          edges {
            node {
              title
              url
              createdAt
              additions
              deletions
              mergeable
              author {
                avatarUrl
                login
              }
              labels(first:20) {
                edges {
                  node {
                    name
                  }
                }
              }
              reviews(last:10) {
                edges {
                  node {
                    state
                  }
                }
              }
            }
          }
        }
      }
    }`;

  return client.request(query, { name, owner }).then(parsePRs);
};

module.exports = (graphQLClient) => ({
  getPRs(repos) {
    return Promise.all(
      repos.map(([owner, name]) => getPRsForRepo(graphQLClient, owner, name))
    ).then((results) => results.reduce((result, prs) => result.concat(prs), []));
  },
});
