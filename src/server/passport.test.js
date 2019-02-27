const config = require('config')
const {
  serializeUser, deserializeUser, verifyUser, ensureLoggedIn
} = require('./passport')

const context = config.get('app.context')

describe('server/passport', () => {
  const username = 'guom02'
  const firstName = 'Malvin'
  const lastName = 'Guo'
  const email = 'malvin.guo@nyumc.org'

  let user
  beforeEach(() => {
    user = { username, firstName, lastName }
  })

  describe('serializeUser', () => {
    it('converts user and profile to JSON', () => {
      const callback = jest.fn()
      serializeUser(user, callback)
      expect(callback.mock.calls)
      .toEqual([[undefined, '{"username":"guom02","name":"Malvin Guo"}']])
    })
  })

  describe('deserializeUser', () => {
    it('deserialized serialized user', () => {
      const callback = jest.fn()
      serializeUser(user, callback)
      const serializedUser = callback.mock.calls[0][1]
      const callback2 = jest.fn()
      deserializeUser(serializedUser, callback2)
      expect(callback2.mock.calls).toEqual([[
        undefined,
        { username, name: `${firstName} ${lastName}` }
      ]])
    })
  })

  describe('verifyUser', () => {
    const _verifyUser = Promise.promisify(verifyUser)
    const profile = {
      first_name: [firstName],
      last_name: [lastName],
      emails: [email]
    }
    it('stores user', () => _verifyUser(username, profile)
    .then((user) => {
      expect(user).toEqual({
        id: jasmine.any(Number),
        username,
        firstName,
        lastName,
        email,
        createdAt: jasmine.any(Date),
        updatedAt: jasmine.any(Date)
      })
    }))
  })

  describe('ensureLoggedIn', () => {
    let req; let res; let
      next
    beforeEach(() => {
      req = {}
      res = { redirect: jest.fn() }
      next = jest.fn()
    })

    it('redirects when no req.user', () => {
      ensureLoggedIn(req, res, next)
      expect(next.mock.calls.length).toBe(0)
      expect(res.redirect.mock.calls).toEqual([[`${context}/auth/cas`]])
    })

    it('calls next middleware when req.user is set', () => {
      req.user = {}
      ensureLoggedIn(req, res, next)
      expect(next.mock.calls.length).toBe(1)
      expect(res.redirect.mock.calls.length).toBe(0)
    })
  })
})
