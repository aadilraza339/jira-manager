
const knex = require("./connection");

const updateTicketsData = (ticket)=>{
    return knex.transaction(
		async (trx) => {
			const ticketDetails = await trx("tickets").where({"number":ticket.number})
            if(ticketDetails.length) {
                await trx("tickets").update(ticket).where({"number":ticket.number})
            }
            else {
               await trx("tickets").insert(ticket) 
            }

		}
	)
}

const getTickets = ()=>{
    return knex("tickets").select("*")
}

module.exports  = {
    updateTicketsData,
    getTickets
}