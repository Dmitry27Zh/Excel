import { DOMListener } from '@core/dom-listener'
import { capitalize } from '@core/utils'

export class ExcelComponent extends DOMListener {
  static tagName = 'div'

  constructor($root, options = {}) {
    super($root, options.eventTypes)
    this.bindListeners()
  }

  init() {
    this.addListeners()
  }

  static getListenerName = (eventType) => {
    return `on${capitalize(eventType)}`
  }

  bindListeners() {
    this.eventTypes.forEach((eventType) => {
      const listenerName = ExcelComponent.getListenerName(eventType)
      this[listenerName] = this[listenerName].bind(this)
    })
  }

  toHTML() {
    return ''
  }
}
