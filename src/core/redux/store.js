export class Store {
  constructor(state, rootReducer) {
    this.state = rootReducer(state, '__INIT__')
    this.rootReducer = rootReducer
    this.listeners = []
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener) {
    this.listeners.push(listener)
  }
}
