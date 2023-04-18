
const express = require('express');
const app = express();
const port = 3000;
const tickets = require("./routes/tickets")


app.use("/api/v1",tickets)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});












