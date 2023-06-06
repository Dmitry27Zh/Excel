export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.subscription = null
  }

  subscribeComponents(components) {
    this.subscription = this.store.subscribe(() => {
      console.log('Central subscribtion!')
    })
  }

  unsubscribeComponents() {
    this.subscription.unsubscribe()
  }
}
