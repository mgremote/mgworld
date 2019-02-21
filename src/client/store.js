import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';

export function createMiddleware() {
  const middleware = [thunk, promiseMiddleware()];
  if (window.localStorage && window.localStorage.log) {
    middleware.push(createLogger());
  }
  return middleware;
}

export function create() {
  return createStore(
    reducers,
    applyMiddleware(...createMiddleware()),
  );
}

export default create();
