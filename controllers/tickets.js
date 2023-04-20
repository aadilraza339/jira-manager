const axios = require("axios");
const query = require("../model/query")
require("dotenv").config();

const jiraRequestHeaders = {
  Authorization: `Basic ${Buffer.from(`${process.env.EMAIL}:${process.env.JIRA_AP_TOKEN}`).toString("base64")}`,
};

const updateTicketsRecords = (req, res) => {
  axios.get(`${process.env.BASE_URL}rest/agile/1.0/board/1/issue`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...jiraRequestHeaders,
    }
  })
    .then(async (response) => {
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
      res.status(200).send({
        success: true,
        data: arrayOfTickets,
        message: "Successfully fetch tickets",
      });

    })
    .catch((err) => {
      console.log("err", err, JSON.stringify(err));
      res.status(err.status || 500).send({
        success: false,
        message: err.message || "Internal Server Error",
      });
    })
}



module.exports = {
  updateTicketsRecords
};
