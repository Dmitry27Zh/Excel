import { StoreSubscriber } from '@/redux/store-subscriber'

export class Page {
  constructor(options) {
    this.$root = null
    this.storeSubscriber = new StoreSubscriber(options.store)
  }

  init() {
    this.$root = this.getRoot()
    this.components.forEach((component) => component.init())
    this.storeSubscriber.subscribeComponents(this.components)
  }

  destroy() {
    console.log('Destroy page!')
    this.components.forEach((component) => component.destroy())
    this.storeSubscriber.unsubscribeComponents()
  }
}
