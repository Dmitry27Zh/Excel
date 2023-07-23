import { isEqual } from '@core/utils'
import { Mode } from '@core/constants'

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

      if (process.env.NODE_ENV === Mode.DEVELOPMENT) {
        window.redux.prevState = this.prevState
      }

      this.prevState = currentState

      if (process.env.NODE_ENV === Mode.DEVELOPMENT) {
        window.redux.currentState = currentState
      }
    })
  }

  unsubscribeComponents() {
    this.subscription.unsubscribe()
  }
}
