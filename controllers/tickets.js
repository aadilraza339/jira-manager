const axios = require("axios");
const query = require("../model/query")
require("dotenv").config();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Basic ${Buffer.from(`${process.env.EMAIL}:${process.env.JIRA_AP_TOKEN}`).toString("base64")}`,
};

const updateTicketsRecords = async(req, res) => {
  try {
    let {
      page = 1,
  } = req.query;
   const response = await axios.get(`${process.env.BASE_URL}rest/agile/1.0/board/1/issue`, {
      headers
    })
    const issues = response.data.issues
    const arrayOfTickets = []
    for (let issue of issues) {
      const number = issue.key;
      const name = issue.fields.summary;
      const description = issue.fields.description;
      const reporter = issue.fields.reporter.displayName;
      const status = issue.fields.status.name;
      const dueDate = issue.fields.duedate;
      arrayOfTickets.push({ number, name, description, reporter, status, dueDate })
      await query.updateTicketsData({ number, name, description, reporter, status, dueDate })
    }
    const tickets = await query.getTickets(page)
    res.status(200).send({
      success: true,
      data: tickets,
      message: "Successfully fetch tickets",
    });
   
  } catch (error) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
  
}

const closeTicket = async (req, res) => {
  try {
    const comment = req.body?.comment;
    const transitionData = {
      transition: {
        id: '31',// ID of the "Closed" transition.
      }
    }
    const issueKey = req.params.id;
    await axios.post(`${process.env.BASE_URL}/rest/api/3/issue/${issueKey}/transitions`, transitionData, {
      headers,
    })
    if (comment) {
    
      const updateData = {
    
        update: {
          comment: [
            {
              add: {
                body: comment,
              },
            },
          ],
        },
      };
      await axios.put(`${process.env.BASE_URL}/rest/api/2/issue/${issueKey}`, updateData, {
        headers,
      })
    }


    res.status(200).send({
      success: true,
      message: "Successfully Close Ticket",
    });


  } catch (err) {
    console.log(err);
    res.status(err.status || 500).send({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }

};

const fetchIssues = async (req, res) => {
  try {
    let {
      page = 1,
  } = req.query;
    const [totalItemCount] =  await query.getTotalCount()
    const arrayOfTickets = await query.getTickets(page)

    res.status(200).send({
      success: true,
      data: arrayOfTickets,
      totalItemCount,
      message: "Successfully fetch Tickets",
    });

  } catch (err) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}  



module.exports = {
  updateTicketsRecords,
  closeTicket,
  fetchIssues
};
