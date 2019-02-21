import axios from 'axios';
import * as http from './http';

window.APP_CONTEXT = '/my-app';

jest.mock('axios', () => jest.fn().mockReturnValue(Promise.resolve({ data: { id: 1 } })));

describe('client/http', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  const url = '/my/url';
  const params = { a: 1 };
  const data = { b: 1 };
  const result = { id: 1 };

  describe('get', () => {
    it('sends get request', () => http.get(url, params)
      .then((value) => {
        expect(value).toEqual(result);
        expect(axios.mock.calls).toEqual([[{
          baseURL: '/my-app',
          url,
          params,
          method: 'GET',
        }]]);
      }));
  });

  describe('put', () => {
    it('sends a put request', () => http.put(url, data)
      .then((value) => {
        expect(value).toEqual(result);
        expect(axios.mock.calls).toEqual([[{
          baseURL: '/my-app',
          url,
          data,
          method: 'PUT',
        }]]);
      }));
  });

  describe('post', () => {
    it('sends a post request', () => http.post(url, data)
      .then((value) => {
        expect(value).toEqual(result);
        expect(axios.mock.calls).toEqual([[{
          baseURL: '/my-app',
          url,
          data,
          method: 'POST',
        }]]);
      }));
  });

  describe('del', () => {
    it('sends a delete request', () => http.del(url, data)
      .then((value) => {
        expect(value).toEqual(result);
        expect(axios.mock.calls).toEqual([[{
          baseURL: '/my-app',
          url,
          data,
          method: 'DELETE',
        }]]);
      }));
  });
});
