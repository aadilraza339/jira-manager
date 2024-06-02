import axios from "axios";

const { useState } = require("react");

function SelectOption({ticket,refreshTickets,customOption}) {
    const [moveTo, setmoveTo] = useState({ number: 0, name: 0 });
    const fetchTickets = async (e) => {

        try {
            await axios.put(`https://jira-manager-ecze-1bl7fzj0l-aadilraza339s-projects.vercel.app/api/v1/tickets/${ticket.number}/${e.target.value}`)
            setmoveTo({ number: ticket.number, name: e.target.value })
            refreshTickets()
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="form-group">
        <label>Move Ticket:</label>
        <select
            value={moveTo.name}
            onChange={(e)=>{fetchTickets(e)}}
            required
        >
           {customOption}
        </select>
    </div>
    )
}

export default SelectOption