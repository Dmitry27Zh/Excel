import { storage } from '@core/storage'
import { INITIAL_STATE } from '@/redux/initial-state'
import { rootReducer } from '@/redux/root-reducer'
import { Store } from '@/redux/store'
import { StoreSubscriber } from '@/redux/store-subscriber'
import { createAction } from '@/redux/actions'
import { Type } from '@/redux/type'
import { debounce } from '@core/utils'
import { Ms } from '@core/constants'

export class Page {
  constructor({
    name,
  }) {
    this.$root = null
    this.name = name
    this.store = null
    this.storeSubscriber = null
  }

  init() {
    const initialState = storage.get(this.name) ?? INITIAL_STATE
    this.store = new Store(initialState, rootReducer)
    this.storeSubscriber = new StoreSubscriber(this.store)
    this.$root = this.getRoot()
    this.components.forEach((component) => component.init())
    this.storeSubscriber.subscribeComponents(this.components)
    this.store.dispatch(createAction(Type.PAGE_LOAD, this.name))
    this.store.subscribe(this.saveState)
  }

  saveState = debounce((state) => {
    storage.set(this.name, state)
  }, Ms.DEBOUNCE_REDUX)

  destroy() {
    console.log('Destroy page!')
    this.$root.$el.remove()
    this.components.forEach((component) => component.destroy())
    this.storeSubscriber.unsubscribeComponents()
  }
}
