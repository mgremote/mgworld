const config = require('config');

const context = config.get('app.context');
const express = require('express');
const request = require('supertest');
const app = require('./app');

describe('server/app', () => {
  const testApp = express();

  let user;
  beforeEach(() => {
    user = undefined;
  });
  testApp.use((req, res, next) => {
    req.user = user;
    next();
  });
  testApp.use(app);

  describe('GET /', () => {
    it('redirects to context + /app', () => request(app)
      .get('/')
      .expect(302)
      .expect('Location', `${context}/app`));
  });

  describe(`GET ${context}`, () => {
    it('redirects to context + /app', () => request(app)
      .get(context)
      .expect(302)
      .expect('Location', `${context}/app`));
  });

  describe('GET /logout', () => {
    it('logouts the current user and redirects', () => request(app)
      .get(`${context}/logout`)
      .expect(307)
      .expect('Location', /logout\?service=http/));
  });

  describe('GET /app/home', () => {
    it('redirects to login when not logged in', () => request(testApp)
      .get(`${context}/app/home`)
      .expect(302)
      .expect('Location', `${context}/auth/cas`));

    it('renders the page when logged in', () => {
      user = { name: 'John Doe', username: 'doej01' };
      return request(testApp)
        .get(`${context}/app/home`)
        .expect(200)
        .expect(/window\.APP_USER = .*"John Doe"/);
    });
  });
});
