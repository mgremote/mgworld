const request = require('supertest');
const express = require('express');
const { handleApiError, handleViewError, HttpError } = require('./errors');

describe('server/errors', () => {
  let app;
  beforeEach(() => {
    app = express();
  });

  describe('HttpError', () => {
    it('sets default status to 500', () => {
      const err = new HttpError('test');
      expect(err.status).toEqual(500);
      const err2 = new HttpError('test', 400);
      expect(err2.status).toEqual(400);
    });
  });

  describe('handleApiError', () => {
    it('returns a json with error', () => {
      app.get('/test', (req, res) => {
        throw new Error('Test error');
      });
      app.use(handleApiError);
      return request(app)
        .get('/test')
        .expect(500)
        .expect('{"error":"Internal Server Error"}');
    });

    it('takes status code from http error if present', () => {
      app.get('/test', (req, res) => {
        throw new HttpError('Validation failed', 400);
      });
      app.use(handleApiError);
      return request(app)
        .get('/test')
        .expect(400)
        .expect('{"error":"Validation failed"}');
    });
  });

  describe('handleViewError', () => {
    it('renders error template', () => {
      app.get('/test', (req, res) => {
        throw new Error('Test error');
      });
      app.use(handleViewError);
      return request(app)
        .get('/test')
        .expect(500)
        .expect(/An unexpected error has occurred/);
    });
  });
});
