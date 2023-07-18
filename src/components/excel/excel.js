import { $ } from '@core/dom'
import { Observer } from '@core/observer'
import { Page } from '@core/routing/page'

export class Excel extends Page {
  constructor(options) {
    super(options)
    this.components = options.components ?? []
    this.observer = new Observer()
    this.init()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const commonComponentSettings = {
      observer: this.observer,
      store: this.store,
    }

    this.components = this.components.map((Component) => {
      const $el = $.create(Component.TAG_NAME, Component.CLASS_NAME)
      const component = new Component($el, commonComponentSettings)
      $root.append($el)

      return component
    })

    return $root
  }
}
