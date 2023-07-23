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

  async notify(event, data) {
    for (const listener of this.listeners[event]) {
      await listener(data)
    }
  }
}
