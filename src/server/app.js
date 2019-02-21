const bodyParser = require('body-parser');
const config = require('config');
const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const { handleApiError, handleViewError } = require('./errors');
const { log } = require('./log');
const {
  passport, ensureLoggedIn, ensureAuthorized, logout,
} = require('./passport');

const appName = config.get('app.name');
const context = config.get('app.context');
const secret = config.get('app.secret');
const title = config.get('app.title');

const app = express();
const contextRouter = express.Router();

app.locals = { context, title };
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.use((req, res, next) => {
  const start = Date.now();
  req.on('end', () => {
    log.info('%d %s %s %dms',
      res.statusCode, req.method, req.originalUrl, Date.now() - start);
  });
  next();
});

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: appName,
    keys: [secret],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

function redirectHome(req, res) {
  log.info('home');
  res.redirect(`${context}/app`);
}
app.get('/', redirectHome);
contextRouter.use('/public', express.static(path.join(__dirname, '../public')));
contextRouter.use('/fonts', express.static(path.join(
  __dirname, '../../node_modules/font-awesome/fonts',
)));

contextRouter.get('/', redirectHome);

contextRouter.get('/app*', [
  ensureLoggedIn,
  (req, res) => res.render('home', { user: req.user }),
]);
contextRouter.get('/auth/cas', passport.authenticate('cas', {
  failureRedirect: `${context}/login`,
  successRedirect: `${context}/app`,
}));
contextRouter.get('/logout', logout);

contextRouter.use('/api', ensureAuthorized);
contextRouter.use('/api', require('./record/router'));

contextRouter.use('/api', handleApiError);

app.use(context, contextRouter);

app.use(handleViewError);

module.exports = app;
