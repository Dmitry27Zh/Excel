import { rootReducer } from '@/redux/root-reducer'
import { initialState } from '@/redux/initial-state'
import { Store } from '@/redux/store'
import { StoreSubscriber } from '@/redux/store-subscriber'
import { createAction } from '@/redux/actions'
import { Type } from '@/redux/type'
import { storage } from '@core/storage'
import { debounce } from '@core/utils'
import { Ms } from '@core/constants'

export class Page {
  constructor({
    name,
  }) {
    this.$root = null
    this.name = name
    this.store = new Store(initialState, rootReducer)
    this.storeSubscriber = new StoreSubscriber(this.store)
  }

  init() {
    this.$root = this.getRoot()
    this.components.forEach((component) => component.init())
    this.storeSubscriber.subscribeComponents(this.components)
    this.store.dispatch(createAction(Type.PAGE_LOAD, this.name))
    this.store.subscribe(this.saveState)
  }

  saveState = debounce((state) => {
    storage.set('excel-state', state)
  }, Ms.DEBOUNCE_REDUX)

  destroy() {
    console.log('Destroy page!')
    this.components.forEach((component) => component.destroy())
    this.storeSubscriber.unsubscribeComponents()
  }
}
