const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Express Server', () => {
  // Test the home page for 200 status code
  it('Handles a GET request to /', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });

  // Test the /message endpoint for valid content
  it('Handles a GET request to /message', async () => {
    const response = await request(app).get('/message');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message && true, true);
    assert.strictEqual(response.body.hostname && true, true);
    assert.strictEqual(response.body.dateTime && true, true);
  });

  // Test the /healthz endpoint for 200 status code and OK text
  it('Handles a GET request to /healthz', async () => {
    const response = await request(app).get('/healthz');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text.toUpperCase(), 'OK');
  });

  // Test for 404 errors on unknown routes
  it('Handles a GET request to an unknown route', async () => {
    const response = await request(app).get('/unknown');
    assert.strictEqual(response.status, 404);
  });
});
