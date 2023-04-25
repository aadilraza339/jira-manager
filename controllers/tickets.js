const axios = require("axios");
const query = require("../model/query")
require("dotenv").config();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Basic ${Buffer.from(`${process.env.EMAIL}:${process.env.JIRA_AP_TOKEN}`).toString("base64")}`,
};

const fetchUpdateTickets = async (page) => {
  // Calculate the starting index for the Jira API page based on the requested page number
  const jiraApiPage = (page - 1) * 10;
  const response = await axios.get(`${process.env.BASE_URL}rest/agile/1.0/board/1/issue?startAt=${jiraApiPage}&maxResults=10`, {
    headers
  })
  const issues = response.data.issues
  const arrayOfTickets = []
  // Loop through each issue and transform its data into a simpler object format
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
  // Return the total number of issues and the issue data
  return [response.data.total, arrayOfTickets]
}

const updateTicketsRecords = async (req, res) => {
  try {
    let {
      page = 1,
    } = req.query;

    const [total,arrayOfTickets] = await fetchUpdateTickets(page)
    res.status(200).send({
      success: true,
      data: arrayOfTickets,
      total,
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
    // Extract the comment from the request body, if any
    const comment = req.body?.comment;
    const transitionData = {
      transition: {
        id: '31',// ID of the "Closed" transition.
      }
    }
    const issueKey = req.params.id;
     // Make a POST request to the Jira API to transition the issue to the "Closed" status
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
    // Make a GET request to the Jira API to fetch total count of issue
    const response = await axios.get(`${process.env.BASE_URL}rest/agile/1.0/board/1/issue`, {
      headers
    })
    let arrayOfTickets = await query.getTickets(page)
    // If no tickets were found in the database, fetch them from the Jira API and update the database
    if (!arrayOfTickets.length) {
       [total,arrayOfTickets] = await fetchUpdateTickets(page)
    }
  
    res.status(200).send({
      success: true,
      data: arrayOfTickets,
      total: response.data.total,
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
