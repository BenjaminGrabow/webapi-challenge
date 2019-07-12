const express = require('express');
const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

const server = express();

server.use(express.json());

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

module.exports = server;