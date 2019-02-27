const handlePromise = require('../handlePromise')
const router = require('express').Router()
const service = require('./service')

router.get('/records/:id', handlePromise((req, res) => service.get(req.params.id)))

router.post('/records', handlePromise((req, res) => service.save(req.body)))

router.put('/records/:id', handlePromise((req, res) => {
  req.body.id = req.params.id
  return service.update(req.body)
}))

router.delete('/records/:id', handlePromise((req, res) => service.destroy(req.params.id)))

router.get('/records', handlePromise((req, res) => service.findAll()))

module.exports = router
