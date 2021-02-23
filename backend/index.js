const app = require('./app');

const port = process.env.SERVICE_PORT || 8081;

app.listen(port, () => {
  process.stdout.write(`API server listening on port ${port}\n`);
});
