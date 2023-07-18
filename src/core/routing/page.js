import { StoreSubscriber } from '@/redux/store-subscriber'

export class Page {
  constructor({
    store,
    name,
  }) {
    this.$root = null
    this.name = name
    this.storeSubscriber = new StoreSubscriber(store)
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
