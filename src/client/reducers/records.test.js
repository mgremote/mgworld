import { keyBy, uniqueId } from 'lodash'
import * as RecordActions from '../actions/RecordActions'
import * as http from '../http'
import * as c from '../constants'
import { create } from '../store'

jest.mock('../http')

describe('reducers/records', () => {
  let store
  beforeEach(() => {
    store = create()
  })

  describe('RECORD_ADD', () => {
    let lastId
    http.post.mockImplementation(() => {
      const id = uniqueId()
      lastId = id
      return Promise.resolve({ id, name: 'test' })
    })

    it('adds a new record', (done) => {
      const record = { name: 'test' }
      store.dispatch(RecordActions.add(record))
      store.subscribe(() => {
        expect(store.getState().records.byId)
        .toEqual({
          [lastId]: { id: lastId, name: record.name }
        })
        done()
      })
    })
  })

  describe('RECORD_REMOVE', () => {
    beforeEach(() => {
      [1, 2].forEach((id) => store.dispatch({
        type: c.RECORD_ADD_FULFILLED,
        payload: { id, name: `test${id}` }
      }))
    })

    http.del.mockImplementation(() => Promise.resolve(1))

    it('removes a record', (done) => {
      store.dispatch(RecordActions.remove(1))
      store.subscribe(() => {
        expect(store.getState().records.byId)
        .toEqual({
              2: { id: 2, name: 'test2' }
        })
        done()
      })
    })
  })

  describe('RECORD_FIND', () => {
    const data = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }]
    http.get.mockImplementation(() => Promise.resolve(data))

    it('fetches data and replaces state', (done) => {
      store.dispatch(RecordActions.findAll())
      store.subscribe(() => {
        expect(store.getState().records.byId)
        .toEqual(keyBy(data, 'id'))
        done()
      })
    })
  })
})
