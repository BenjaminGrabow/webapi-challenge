const express = require('express');
const cors = require('cors');
const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

module.exports = server;