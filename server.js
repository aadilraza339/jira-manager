
const express = require('express');
var cors = require('cors')
const app = express();

// Calling the express.json() method for parsing
app.use(express.json());
app.use(cors())

const port = 3000;
const tickets = require("./routes/tickets")


app.use("/api/v1",tickets)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});












