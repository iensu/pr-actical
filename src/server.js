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

let data = [];
const fetchInterval = 5 * 60 * 1000;

const updateData = () => {
  dataFetcher.getPRs(config.repos).then((prs) => (data = prs));
};

server.use(auth);

server.use(express.static('public'));

server.get('/', (req, res) => res.sendFile(path.join(__dirname, './assets/index.html')));

server.get('/api/prs', (req, res) => res.json(data));

updateData();

setInterval(updateData, fetchInterval);

module.exports = server;
