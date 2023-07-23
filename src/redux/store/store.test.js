import { Store } from './store'

describe('TEST', () => {
  test('test', () => {
    const store = new Store({}, () => {})
    expect(store).toBeDefined()
  })
})
