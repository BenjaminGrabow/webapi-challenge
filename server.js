const express = require("express");
const ActionRouter = require("./data/helpers/ActionRouter");
const ProjectRouter = require("./data/helpers/ProjectRouter");

const server = express();

server.use(express.json());

server.use("/api/action", ActionRouter);
server.use("/api/project", ProjectRouter);

module.exports = server;