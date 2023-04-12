import { capitalize } from './utils'

export class DOMListener {
  constructor($root, eventTypes = []) {
    if (!$root) {
      throw new Error('No $root provided for DOMListener!')
    }

    this.$root = $root
    this.eventTypes = eventTypes
  }

  addListeners() {
    this.eventTypes.forEach((eventType) => {
      const callbackName = getCallbackName(eventType)
      const callback = this[callbackName]?.bind(this)

      if (!callback) {
        throw new Error(
            `Callback ${callbackName} is not implemented in ${this.name} Component`
        )
      }

      this.$root.on(eventType, callback)
    })
  }
}

const getCallbackName = (eventType) => {
  return `on${capitalize(eventType)}`
}
