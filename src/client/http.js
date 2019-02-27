import axios from 'axios'
import { getContext } from './context'

function request (options) {
  const context = getContext()
  options.baseURL = context
  return axios(options)
  .then((res) => res.data)
}

export function get (url, params) {
  const method = 'GET'
  return request({ url, params, method })
}

export function post (url, data) {
  const method = 'POST'
  return request({ url, data, method })
}

export function put (url, data) {
  const method = 'PUT'
  return request({ url, data, method })
}

export function del (url, data) {
  const method = 'DELETE'
  return request({ url, data, method })
}
