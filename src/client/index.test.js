jest.mock('./components/Home')

describe('client/index', () => {
  beforeEach(() => {
    window.APP_USER = { name: 'John Doe', username: 'doej01' }
    window.APP_CONTEXT = '/my-app'
  })

  let $div
  beforeEach(() => {
    $div = window.document.createElement('div')
    $div.id = 'container'
    window.document.body.appendChild($div)
  })

  afterEach(() => {
    window.document.body.removeChild($div)
  })

  it('renders', () => {
    jest.unmock('./index')
    require('./index')
    expect($div.textContent).toContain('John Doe')
  })
})
