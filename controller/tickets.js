const axios = require("axios");
const baseUrl = "https://aadilraza339.atlassian.net/";
require("dotenv").config();

const jiraRequestHeaders = {
  Authorization: `Basic ${Buffer.from(`${process.env.EMAIL}:${process.env.JIRA_AP_TOKEN}`).toString("base64")}`,
};

const fetchIssues = (req,res)=>{
    axios.get(`${baseUrl}rest/agile/1.0/board/1/issue`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...jiraRequestHeaders,
        }})
      .then((response) => {
        const issues = response.data.issues
      
        for (let issue of issues) {
          const number = issue.key;
          const name = issue.fields.summary;
          const description = issue.fields.description;
          const reporter = issue.fields.reporter.displayName;
          const status = issue.fields.status.name;
          const due_date = issue.fields.duedate;
      
          const query = {
              values: [number, name, description, reporter, status, due_date]
          };
          console.log(query);
      }
        
      })
      .catch((err) => {
        console.log("err",err,JSON.stringify(err));
       
      })
}


module.exports = {
    fetchIssues
};