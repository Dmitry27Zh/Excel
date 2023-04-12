import { DOMListener } from '@core/dom-listener';

export class ExcelComponent extends DOMListener {
  static tagName = 'div'

  constructor($root, options = {}) {
    super($root, options.eventTypes)
  }

  init() {
    this.addListeners()
  }

  toHTML() {
    return ''
  }
}
