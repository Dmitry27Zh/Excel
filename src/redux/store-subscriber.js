import { isEqual } from '@core/utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.subscription = null
    this.prevState = store.getState()
  }

  subscribeComponents(components) {
    this.subscription = this.store.subscribe(() => {
      const currentState = this.store.getState()

      Object.entries(currentState).forEach(([key, value]) => {
        const prevValue = this.prevState[key]

        if (!isEqual(value, prevValue)) {
          components.forEach((component) => {
            const listener = component.storeListeners[key]
            listener?.(value)
          })
        }
      })

      this.prevState = currentState
    })
  }

  unsubscribeComponents() {
    this.subscription.unsubscribe()
  }
}
