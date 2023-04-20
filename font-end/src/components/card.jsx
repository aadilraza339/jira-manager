import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Card() {
    const [tickets, setTickets] = useState([])
    const [refresh,setRefresh] = useState(false)
    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/tickets')
            setTickets(response.data.data)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchTickets()
    }, [])
    const  refreshTickets = async()=>{
        setRefresh(true)
        try {
            const response = await axios.get('http://localhost:3000/api/v1/tickets/reload')
            setTickets(response.data.data)
            setRefresh(false)
        } catch (error) {
            console.log(error);
            setRefresh(false)
        }
    }
    return (
        <>
            <h1>Jira Manager</h1>
            <div className="sub-header">
                <div className="reload-box">
                    {!refresh ?
                    
                (
                    <span onClick={refreshTickets}>Reload</span>

                )
                :   <img src="/icons8-refresh.gif" alt="My Image" />
            }

                </div>
            </div>
            {!tickets.length ? (
                <div className="">Loaing</div>
            )
                :
                <div className="tickets-board">
                
                <div className="card-column">
                    <div className="card-label">TO Do</div>
                    {tickets.map((ticket)=>
                     {   return ticket.status ==="To Do" ? (
                     <div className="card">
                        <div className="card-title">
                            {ticket.name}
                        </div>
                        <div className="card-id">{ticket.number}</div>
                     
                     </div>)
                    : null 
                    }
                    )}
                </div>

                <div className="card-column">
                    <div className="card-label">In Progress</div>
                    {tickets.map((ticket)=>
                     {   return ticket.status ==="In Progress" ? (
                     <div className="card">
                        <div className="card-title">
                            {ticket.name}
                        </div>
                        <div className="card-id">{ticket.number}</div>
                     
                     </div>)
                    : null 
                    }
                    )}
                </div>
                <div className="card-column">
                    <div className="flex-row">
                        <input type="checkbox" name="" id=""  checked/>
                        <div className="checkbox-label">Done</div>

                    </div>
                    {tickets.map((ticket)=>
                     {   return ticket.status ==="Done" ? (
                     <div className="card">
                        <div className="card-title">
                            {ticket.name}
                        </div>
                        <div className="card-id">{ticket.number}</div>
                     
                     </div>)
                    : null 
                    }
                    )}
                </div>
                </div>

            }
        </>
    )
}

export default Card