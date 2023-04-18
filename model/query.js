
const knex = require("./connection");

const insertTickets = (tickets)=>{
    return knex("tickets").insert(tickets) 
}


module.exports  = {
    insertTickets,
}