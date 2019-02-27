const express = require('express')
const request = require('supertest')
const _app = require('../app')

describe('server/record/router', () => {
  let app; let
    user
  beforeEach(() => {
    app = express()
    app.use((req, res, next) => {
      req.user = user
      next()
    })
    app.use(_app)
  })

  function createRecord (record = { name: 'test' }) {
    return request(app)
    .post('/my-app/api/records')
    .send(record)
    .expect(200)
    .expect(/"id":[0-9]+/)
    .then(r => r.body)
  }

  function _update (record) {
    return request(app)
    .put(`/my-app/api/records/${record.id}`)
    .send(record)
  }

  function updateRecord (record) {
    return _update(record)
    .expect(200)
    .expect(/"id":[0-9]+/)
    .then(r => r.body)
  }

  function deleteRecord (id) {
    return request(app)
    .delete(`/my-app/api/records/${id}`)
    .expect(200)
    .expect(/1/)
  }

  function getRecord (id) {
    return request(app)
    .get(`/my-app/api/records/${id}`)
    .expect(200)
    .expect(/"id":[0-9]+/)
    .then(r => r.body)
  }

  describe('CREATE UPDATE READ UPDATE DELETE', () => {
    it('fetches, retrieves, updates and deletes a record', () => {
      user = {}
      return createRecord()
      .then(createRecord)
      .then(r => getRecord(r.id))
      .then((r) => {
        r.name = 'test2'
        return updateRecord(r)
        .then((r) => {
          expect(r.name).toEqual('test2')
          return r
        })
      })
      .then(r => deleteRecord(r.id))
    })
  })

  describe('UPDATE /my-app/api/records/:id', () => {
    it('returns 404 when id not found', () => _update({ name: 'test' })
    .expect(404))
  })

  describe('GET /my-app/api/records', () => {
    it('retrieves all records', () => {
      user = {}
      return request(app)
      .get('/my-app/api/records')
      .expect(200)
      .expect(/^\[/)
    })

    it('denies access when unauthorized', () => {
      user = undefined
      return request(app)
      .get('/my-app/api/records')
      .expect(401)
    })
  })
})
