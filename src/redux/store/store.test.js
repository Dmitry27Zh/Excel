import { Store } from './store'

const initialState = {
  count: 0,
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      ...state,
      count: state.count + 1,
    }
  }

  return state
}

describe('TEST', () => {
  let store
  let listener

  beforeEach(() => {
    store = new Store(initialState, reducer)
    listener = jest.fn()
  })

  test('should return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return initial state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if action exists', () => {
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })

  test('should not change state if action doesn\'t exist', () => {
    store.dispatch({ type: 'UNEXIST' })
    expect(store.getState().count).toBe(0)
  })

  test('should call listener function', () => {
    store.subscribe(listener)
    store.dispatch({ type: 'ADD' })

    expect(listener).toHaveBeenCalled()
    expect(listener).toHaveBeenCalledWith(store.getState())
  })

  test('should not call listener if unsubscribed', () => {
    const subscribtion = store.subscribe(listener)
    subscribtion.unsubscribe()
    store.dispatch({ type: 'ADD' })

    expect(listener).not.toHaveBeenCalled()
  })

  test('should dispatch in async way', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' })
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
