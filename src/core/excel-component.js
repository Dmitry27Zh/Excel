import { DOMListener } from '@core/dom-listener'
import { capitalize } from '@core/utils'

export class ExcelComponent extends DOMListener {
  static tagName = 'div'

  constructor($root, options = {
    name: new.target.name,
  }) {
    super($root, options.eventTypes)
    this.name = options.name

    this.bindListeners()
  }

  init() {
    this.addListeners()
  }

  destroy() {
    this.removeListeners()
  }

  static getListenerName = (eventType) => {
    return `on${capitalize(eventType)}`
  }

  bindListeners() {
    this.eventTypes.forEach((eventType) => {
      const listenerName = ExcelComponent.getListenerName(eventType)
      const listener = this[listenerName]?.bind(this)

      if (!listener) {
        throw new Error(
            `Listener ${listenerName} is not implemented in ${this.name} Component`
        )
      }

      this[listenerName] = listener
    })
  }

  toHTML() {
    return ''
  }
}
