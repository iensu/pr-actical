const dataFetcher = require('../src/data-fetcher.js');

const graphQLClientMock = (result = { repository: { pullRequests: { edges: [] } } }) => ({
  request: sinon.stub().resolves(result),
});

describe('data-fetcher', () => {
  describe('#getPRs', () => {
    it('transforms the result into PR objects', async () => {
      const gqlMock = graphQLClientMock(require('./data/graphql-get-prs-result.json'));

      const result = await dataFetcher(gqlMock).getPRs([['repo-owner', 'my-repo']]);

      expect(result).to.eql([
        {
          additions: 2,
          author: {
            avatarUrl: 'https://avatars0.githubusercontent.com/u/6079136?v=4',
            login: 'bokls',
          },
          changedFiles: 1,
          createdAt: '2018-11-01T16:24:09Z',
          deletions: 2,
          labels: [],
          mergeable: 'MERGEABLE',
          repository: 'my-repo',
          repositoryUrl: 'https://github.com/repo-owner/my-repo',
          reviews: ['CHANGES_REQUESTED'],
          title: 'Remove unnecessary release steps',
          updatedAt: '2018-11-02T07:47:55Z',
          url: 'https://github.com/repo-owner/my-repo/pull/130',
        },
        {
          additions: 1277,
          author: {
            avatarUrl: 'https://ava1.githubusercontent.com/u/22369293?v=4',
            login: 'asdfg',
          },
          changedFiles: 25,
          createdAt: '2018-11-02T16:49:00Z',
          deletions: 885,
          labels: ['WIP'],
          mergeable: 'MERGEABLE',
          repository: 'my-repo',
          repositoryUrl: 'https://github.com/repo-owner/my-repo',
          reviews: [],
          title: 'Send automatic emails',
          updatedAt: '2018-11-02T18:59:25Z',
          url: 'https://github.com/repo-owner/my-repo/pull/131',
        },
      ]);
    });
  });
});
