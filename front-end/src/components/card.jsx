import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from "react-js-pagination";


function Card() {
    const [tickets, setTickets] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false)

    // Function to fetch tickets from the API
    const fetchTickets = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3000/api/v1/tickets?page=${currentPage}`)
            const total = response.data.total
            setTotalItems(total);
            setTickets(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }

    // Load tickets on initial mount and when currentPage changes
    useEffect(() => {
        fetchTickets()
    }, [currentPage])

    // Function to refresh tickets
    const refreshTickets = async () => {
        setRefresh(true)
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/tickets/reload?page=${currentPage}`)
            const total = response.data.total
            setTotalItems(total);
            setTickets(response.data.data)
            setRefresh(false)
        } catch (error) {
            console.log(error);
            setRefresh(false)
        }
    }

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <h1>Jira Manager</h1>
            <div className="sub-header">
                <div className="reload-box">
                    {!refresh ?

                        (
                            <span onClick={refreshTickets}>Reload</span>

                        )
                        : <img src="/icons8-refresh.gif" alt="My Image" />
                    }

                </div>
            </div>
            {/* Show loading spinner if tickets are being fetched */}
            {loading? (
                <div className="loading">Loading...</div>
            )
                :
                 // Show "Empty" message if there are no tickets to display
                !tickets.length ?  <div className="empty">Empty</div> :
                    // Render tickets board if there are tickets to display
                        <div className="tickets-board">

                            <div className="card-column">
                                <div className="card-label">TO Do</div>
                                {tickets.map((ticket) => {
                                    return ticket.status === "To Do" ? (
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
                                {tickets.map((ticket) => {
                                    return ticket.status === "In Progress" ? (
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
                                    <input type="checkbox" name="" id="" checked />
                                    <div className="checkbox-label">Done</div>

                                </div>
                                {tickets.map((ticket) => {
                                    return ticket.status === "Done" ? (
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
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                innerClass="pagination"
                activeClass="active"
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="Prev"
                nextPageText="Next"
                hideFirstLastPages={true}
            />
        </>
    )
}

export default Card