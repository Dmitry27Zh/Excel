import { DOMListener } from '@core/dom-listener'
import { capitalize } from '@core/utils'
import { bindAll } from '@core/utils'

export class ExcelComponent extends DOMListener {
  static TAG_NAME = 'div'

  constructor($root, { eventTypes, name, observer, store }) {
    super($root, eventTypes)
    this.name = name ?? new.target.name
    this.observer = observer
    this.listeners = {}
    this.unsubscribeList = []
    this.store = store
    this.storeSubscriber = null

    this.$root.html(this.toHTML())
    bindAll(this, this)
  }

  prepare() {}

  init() {
    this.prepare()
    this.addListeners()
    this.subscribe()
    this.storeSubscribe()
  }

  destroy() {
    this.removeListeners()
    this.unsubscribe()
    this.storeSubscriber.unsubscribe()
  }

  static getListenerName = (eventType) => {
    return `on${capitalize(eventType)}`
  }

  toHTML() {
    return ''
  }

  subscribe() {
    Object.entries(this.listeners).forEach(([event, listener]) => {
      this.unsubscribeList.push(this.observer.subscribe(event, listener))
    })
  }

  unsubscribe() {
    this.unsubscribeList.forEach((unssubscribe) => unssubscribe())
  }

  storeSubscribe() {
    this.storeSubscriber = this.store.subscribe(this.storeListener)
  }

  storeDispatch(action) {
    this.store.dispatch(action)
  }

  storeListener() {}
}
