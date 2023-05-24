import { DOMListener } from '@core/dom-listener'
import { capitalize } from '@core/utils'
import { bindAll } from '@core/utils'

export class ExcelComponent extends DOMListener {
  static TAG_NAME = 'div'

  constructor($root, {
    eventTypes,
    name,
    observer,
  }) {
    super($root, eventTypes)
    this.name = name ?? new.target.name
    this.observer = observer

    this.$root.html(this.toHTML())
    bindAll(this, this)
  }

  prepare() {}

  init() {
    this.prepare()
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
