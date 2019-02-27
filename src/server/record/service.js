const { Record } = require('../db')
const { HttpError } = require('../errors')

function save (record) {
  if (record.id) {
    return update(record)
  }
  return Record.create(record)
  .then(r => r.get({ plain: true }))
}

function get (id) {
  return Record.findById(id)
  .then(r => r && r.get({ plain: true }))
}

function update (record) {
  return Record.findById(record.id)
  .then((r) => {
    if (!r) {
      throw new HttpError('Not found', 404)
    }
    return r.update(record)
  })
  .then(r => r.get({ plain: true }))
}

function findAll () {
  return Record.findAll()
}

function destroy (id) {
  return Record.destroy({ where: { id } })
}

module.exports = {
  save, get, update, findAll, destroy
}
