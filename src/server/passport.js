const config = require('config');
const CasStrategy = require('passport-cas2').Strategy;
const passport = require('passport');
const { User } = require('./db');

const context = config.get('app.context');
const casURL = config.get('cas.url');

function serializeUser(user, done) {
  done(undefined, JSON.stringify({
    username: user.username,
    name: `${user.firstName} ${user.lastName}`,
  }));
}

function deserializeUser(userJson, done) {
  done(undefined, JSON.parse(userJson));
}

function verifyUser(username, user, done) {
  User.upsert({
    username,
    email: user && user.emails && user.emails[0],
    firstName: user && user.first_name && user.first_name[0],
    lastName: user && user.last_name && user.last_name[0],
  })
    .then(user => User.findOne({
      where: { username },
    })
      .then(u => u.get({ plain: true })))
    .asCallback(done);
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    res.redirect(`${context}/auth/cas`);
    return;
  }
  next();
}

function ensureAuthorized(req, res, next) {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
const cas = new CasStrategy({ casURL }, verifyUser);
passport.use(cas);

function logout(req, res) {
  req.logout();
  const host = req.get('host');
  const redirectUrl = `${req.protocol}://${host}${context}/app`;
  cas.logout(req, res, redirectUrl);
}

module.exports = {
  logout,
  passport,
  serializeUser,
  deserializeUser,
  verifyUser,
  ensureLoggedIn,
  ensureAuthorized,
};
