
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

const getTickets = (currentPage)=>{
    const itemsPerPage = 10; 
    const offset = (currentPage - 1) * itemsPerPage;
   return knex('tickets')
  .select()
  .limit(itemsPerPage)
  .offset(offset)
}

const getTotalCount = ()=>{
    return  knex('tickets')
    .select()
    .count("* as total")   
}
module.exports  = {
    updateTicketsData,
    getTickets,
    getTotalCount
}