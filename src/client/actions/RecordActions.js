import * as c from '../constants';
import * as http from '../http';

export function add({ name }) {
  return {
    type: c.RECORD_ADD,
    payload: http.post('/api/records', { name }),
  };
}

export function remove(id) {
  return {
    type: c.RECORD_REMOVE,
    payload: http.del(`/api/records/${id}`).then(() => ({ id })),
  };
}

export function findAll() {
  return {
    type: c.RECORDS_FIND,
    payload: http.get('/api/records'),
  };
}
