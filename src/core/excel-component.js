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
    this.storeListeners = {}

    bindAll(this, this)
  }

  prepare() {
    this.render()
  }

  init() {
    this.prepare()
    this.addListeners()
    this.subscribe()
  }

  destroy() {
    this.removeListeners()
    this.unsubscribe()
  }

  static getListenerName = (eventType) => {
    return `on${capitalize(eventType)}`
  }

  toHTML() {
    return ''
  }

  render() {
    this.$root.html(this.toHTML())
  }

  subscribe() {
    Object.entries(this.listeners).forEach(([event, listener]) => {
      this.unsubscribeList.push(this.observer.subscribe(event, listener))
    })
  }

  unsubscribe() {
    this.unsubscribeList.forEach((unssubscribe) => unssubscribe())
  }

  storeDispatch(action) {
    this.store.dispatch(action)
  }
}
