const express = require('express');
const os = require('os');
const data = require('./data/quotes.json');

const app = express();

const randomMessage = (messages) => {
  const index = Math.floor(Math.random() * messages.length);
  return {
    hostname: os.hostname(),
    dateTime: new Date(),
    message: messages[index],
  };
};

// Handle home page response
app.get('/', (req, res) => {
  res.status(200).send('Demo API server');
});

// Handle message API response
app.get('/message', (req, res) => {
  res.status(200).json(randomMessage(data));
});

// Handle service health check
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Error Handling
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res) => {
  if (err) res.status(500).send('Internal Server Error');
});

module.exports = app;
