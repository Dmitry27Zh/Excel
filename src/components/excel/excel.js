import { $ } from '@core/dom'
import { Observer } from '@core/observer'
import { StoreSubscriber } from '@/redux/store-subscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components ?? []
    this.observer = new Observer()
    this.store = options.store
    this.storeSubscriber = new StoreSubscriber(options.store)
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

  render() {
    this.$el.append(this.getRoot())
    this.storeSubscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.storeSubscriber.unsubscribeComponents()
    this.components.forEach((component) => component.destroy())
    this.$el.clear()
  }
}
