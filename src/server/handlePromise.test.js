const express = require('express');
const request = require('supertest');
const handlePromise = require('./handlePromise');

describe('server/handlePromise', () => {
  let app;
  beforeEach(() => {
    app = express();
  });

  it('handles a promise and returns a json', () => {
    const status = { status: 'ok' };
    app.get('/test', handlePromise((req, res) => Promise.resolve(status)));
    return request(app)
      .get('/test')
      .expect(200)
      .expect(JSON.stringify(status));
  });

  it('propagates the error', () => {
    app.get('/test', handlePromise((req, res) => Promise.reject(new Error('Test error'))));
    return request(app)
      .get('/test')
      .expect(500)
      .expect(/Test error/);
  });
});
