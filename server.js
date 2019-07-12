const express = require("express");
const ActionRouter = require("./data/helpers/actionModel");
const ProjectRouter = require("./data/helpers/projectModel");

const server = express();

server.use(express.json());

server.use("/api/action", ActionRouter);
server.use("/api/project", ProjectRouter);

module.exports = server;