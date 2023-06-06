export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.subscription = null
  }

  subscribeComponents(components) {
    this.subscription = this.store.subscribe(() => {
      console.log('Central subscription!')
    })
  }

  unsubscribeComponents() {
    this.subscription.unsubscribe()
  }
}
