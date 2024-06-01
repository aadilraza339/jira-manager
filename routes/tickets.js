const ticketsController = require("../controllers/tickets")
const routes = require("express").Router();

routes.get("/tickets/reload", ticketsController.updateTicketsRecords);

routes.put("/tickets/:id/:transitionId", ticketsController.closeTicket);

routes.get("/tickets", ticketsController.fetchIssues);
routes.post('/create-ticket',ticketsController.createTicket)

module.exports = routes;
