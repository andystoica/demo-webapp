const express = require('express');
const os = require('os');
const fetch = require('node-fetch');

const app = express();
const backEndHost = process.env.BACKEND_HOST || 'localhost';
const backEndPort = process.env.BACKEND_PORT || 8081;
const endPoint = '/message';

const getRemoteMessage = async () => {
  try {
    const response = await fetch(`http://${backEndHost}:${backEndPort}${endPoint}`);

    if (response.ok) {
      const data = await response.json();
      return data.message;
    }

    return 'ERROR: The API server did not return correct data.';
  } catch (err) {
    return 'ERROR: Could not retrieve data from the back end API.';
  }
};

// Activate templating engine
app.set('view engine', 'pug');

// Static content from public folder
app.use(express.static('public'));

// Handle home page response
app.get('/', async (req, res) => {
  const message = await getRemoteMessage();

  const data = {
    dateTime: new Date(),
    hostname: os.hostname,
    message,
  };

  res.status(200).render('home', data);
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
  res.status(500).send('Internal Server Error');
});

module.exports = app;
