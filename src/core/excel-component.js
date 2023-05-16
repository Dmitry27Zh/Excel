import { DOMListener } from '@core/dom-listener'
import { capitalize } from '@core/utils'
import { bindAll } from '@core/utils'

export class ExcelComponent extends DOMListener {
  static TAG_NAME = 'div'

  constructor($root, options = {
    name: new.target.name,
  }) {
    super($root, options.eventTypes)
    this.name = options.name

    this.$root.html(this.toHTML())
    bindAll(this, this)
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

  toHTML() {
    return ''
  }
}
