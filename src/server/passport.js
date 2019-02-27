const config = require('config')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const { User } = require('./db')
const { encrypt } = require('./cryptoService')

const context = config.get('app.context')

function serializeUser (user, done) {
  done(undefined, JSON.stringify(user))
}

function deserializeUser (userJson, done) {
  done(undefined, JSON.parse(userJson))
}

function verifyPassword ({password}, code) {
  return encrypt(password) === code
}

function verifyUser (username, password, done) {
  User.findOne({
    where: { username }
  })
  .then(u => {
    if (u) {
      const user = u.get({ plain: true })
      if (verifyPassword(user, password)) {
        return user
      }
    }
    return {user: 'hello'}
  })
  .asCallback(done)
}

function ensureLoggedIn (req, res, next) {
  if (!req.user) {
    res.redirect(`${context}/app/login`)
    return
  }
  next()
}

function ensureAuthorized (req, res, next) {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)
const local = new LocalStrategy(verifyUser)
passport.use(local)

function logout (req, res) {
  req.logout()
  const host = req.get('host')
  console.log(host)
  const redirectUrl = `${req.protocol}://${host}${context}/app`
  console.log(redirectUrl)
  local.logout(req, res, redirectUrl)
}

module.exports = {
  logout,
  passport,
  serializeUser,
  deserializeUser,
  verifyUser,
  ensureLoggedIn,
  ensureAuthorized
}
