const app = require('./app');

const port = process.env.SERVICE_PORT || 8080;

app.listen(port, () => {
  process.stdout.write(`Web App listening on port ${port}\n`);
});
