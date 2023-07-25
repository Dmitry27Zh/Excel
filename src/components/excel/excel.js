import { Page } from '@/pages/page'
import { Observer } from '@core/observer'
import { $ } from '@core/dom'
import { storage } from '@core/storage'

export class Excel extends Page {
  constructor(options) {
    super(options)
    this.observer = new Observer()
    this.listeners = {
      'Header:delete': async () => {
        await storage.delete(this.storeKey)
      },
    }
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

  async init() {
    await super.init()
    this.components.forEach((component) => component.init())
    this.observer.subscribe('Header:delete', this.listeners['Header:delete'])
  }

  destroy() {
    super.destroy()
    this.components.forEach((component) => component.destroy())
  }
}
