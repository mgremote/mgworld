import { create, createMiddleware } from './store'

describe('client/store', () => {
  afterEach(() => {
    delete window.localStorage
  })

  describe('create', () => {
    it('creates a new store', () => {
      const store = create()
      expect(store.dispatch).toEqual(jasmine.any(Function))
      expect(store.getState).toEqual(jasmine.any(Function))
      expect(store.subscribe).toEqual(jasmine.any(Function))
    })
  })

  describe('createMiddleware', () => {
    it('creates a middleware with logger when localStorage.log is set', () => {
      const m = createMiddleware()
      expect(m.length).toBe(2)
      window.localStorage = { log: 'yes' }
      const m2 = createMiddleware()
      expect(m2.length).toBe(m.length + 1)
    })
  })
})
