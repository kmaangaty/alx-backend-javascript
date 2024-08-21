const express = require('express');
const app = express();
const port = 7865;

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// New endpoint with regex validation for :id
app.get('/cart/:id(\\d+)', (req, res) => {
  res.send(`Payment methods for cart ${req.params.id}`);
});

const server = app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

// Export the server instance
module.exports = server;
