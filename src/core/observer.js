export class Observer {
  constructor() {
    this.listeners = {}
  }

  subscribe(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(listener)

    const unsubscribe = () => {
      this.listeners[event] = this.listeners[event]
          .filter((subscribedListener) => subscribedListener != listener)
    }

    return unsubscribe
  }

  notify(event, data) {
    this.listeners[event].forEach((listener) => listener(data))
  }
}
