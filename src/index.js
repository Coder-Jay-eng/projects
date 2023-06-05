const express = require('express');
const app = express();
const connect = require('./config/db');

app.get('/', (req, res) => {
  res.send('I am on home page');
});

app.listen(8080, async () => {
  try {
    await connect();
    console.log('I am able to listen on port 8080');
  } catch (error) {
    console.log({ error: error.message });
  }
});
