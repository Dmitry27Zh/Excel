import { ExcelComponent } from '@core/excel-component'

export class DOMListener {
  constructor($root, eventTypes = []) {
    if (!$root) {
      throw new Error('No $root provided for DOMListener!')
    }

    this.$root = $root
    this.eventTypes = eventTypes
  }

  addListener(eventType) {
    const listenerName = ExcelComponent.getListenerName(eventType)
    const listener = this[listenerName]

    if (!listener) {
      throw new Error(
          `Listener ${listenerName} is not implemented in ${this.name} Component`
      )
    }

    this.$root.on(eventType, listener)
  }

  removeListener(eventType) {
    const listenerName = ExcelComponent.getListenerName(eventType)
    const listener = this[listenerName]

    if (!listener) {
      throw new Error(
          `Listener ${listenerName} is not implemented in ${this.name} Component`
      )
    }

    this.$root.off(eventType, listener)
  }

  addListeners() {
    this.eventTypes.forEach(this.addListener, this)
  }

  removeListeners() {
    this.eventTypes.forEach(this.removeListener, this)
  }
}
