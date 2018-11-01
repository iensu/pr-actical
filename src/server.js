const express = require('express');
const path = require('path');
const { GraphQLClient } = require('graphql-request');
const config = require('./config.js');
const auth = require('./auth.js');

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${config.githubToken}`,
  },
});

const dataFetcher = require('./data-fetcher.js')(client);

const server = express();

const log = (x) => {
  console.log(JSON.stringify(x, null, 2));
  return x;
};

server.use(auth);

server.use(express.static('public'));

server.get('/', (req, res) => res.sendFile(path.join(__dirname, './assets/index.html')));

server.get('/api/prs', (req, res) =>
  dataFetcher
    .getPRs(config.repos)
    .then(log)
    .then((prs) => res.json(prs))
);

module.exports = server;
