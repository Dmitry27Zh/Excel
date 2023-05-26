import { $ } from '@core/dom'
import { Observer } from '@core/observer'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components ?? []
    this.observer = new Observer()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const commonComponentSettings = {
      observer: this.observer,
    }

    this.components = this.components.map((Component) => {
      const $el = $.create(Component.TAG_NAME, Component.CLASS_NAME)
      const component = new Component($el, commonComponentSettings)
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
    this.$el.clear()
  }
}
