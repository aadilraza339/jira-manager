const ticketsController = require("../controllers/tickets")
const routes = require("express").Router();

routes.get("/tickets/reload", ticketsController.updateTicketsRecords);


module.exports = routes;
