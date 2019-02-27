import Immutable from 'seamless-immutable'
import { keyBy } from 'lodash'
import * as c from '../constants'

const defaultState = Immutable({
  byId: {}
})

function add (state, action) {
  const { payload } = action
  const { id } = payload
  const byId = state.byId.merge({ [id]: payload })
  return state.merge({ byId })
}

function remove (state, action) {
  const { payload: { id } } = action
  const byId = state.byId.without(id)
  return state.merge({ byId })
}

function set (state, action) {
  const byId = keyBy(action.payload, 'id')
  return state.merge({ byId })
}

export function records (state = defaultState, action) {
  switch (action && action.type) {
    case c.RECORD_ADD_FULFILLED:
      return add(state, action)
    case c.RECORD_REMOVE_FULFILLED:
      return remove(state, action)
    case c.RECORDS_FIND_FULFILLED:
      return set(state, action)
    default:
      return state
  }
}
