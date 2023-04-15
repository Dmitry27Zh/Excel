import { ExcelComponent } from '@/excel-component'

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
      const listenerName = ExcelComponent.getListenerName(eventType)
      const listener = this[listenerName]

      if (!listener) {
        throw new Error(
            `Callback ${listenerName} is not implemented in ${this.name} Component`
        )
      }

      this.$root.on(eventType, listener)
    })
  }

  removeListeners() {
    this.eventTypes.forEach((eventType) => {
      const listenerName = ExcelComponent.getListenerName(eventType)
      const listener = this[listenerName]

      if (!listener) {
        throw new Error(
            `Callback ${listenerName} is not implemented in ${this.name} Component`
        )
      }

      this.$root.off(eventType, listener)
    })
  }
}
