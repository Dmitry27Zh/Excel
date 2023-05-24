export class Observer {
  constructor() {
    this.listeners = {}
  }

  subscribe(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(listener)
  }

  notify(event, data) {
    this.listeners[event].forEach((listener) => listener(data))
  }
}
