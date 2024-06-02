
const express = require('express');
var cors = require('cors')
const app = express();

// Use CORS with specific configuration
const corsOptions = {
  origin: 'https://your-allowed-origin.com', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const port = 3000;
const tickets = require("./routes/tickets")


app.use("/api/v1",tickets)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});












