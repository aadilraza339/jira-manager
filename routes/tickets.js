const ticketsController = require("../controllers/tickets")
const routes = require("express").Router();

routes.get("/tickets/reload", ticketsController.updateTicketsRecords);

routes.put("/tickets/:id", ticketsController.closeTicket);

module.exports = routes;
