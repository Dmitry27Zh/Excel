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

    this.components = this.components.map((Component) => {
      const $el = $.create(Component.TAG_NAME, Component.CLASS_NAME)
      const component = new Component($el, {
        observer: this.observer,
      })
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }
}
