const ticketsController = require("../controller/tickets")
const routes = require("express").Router();

routes.use("/tickets", ticketsController.fetchIssues);


module.exports = routes;
