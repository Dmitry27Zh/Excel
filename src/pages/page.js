import { storage } from '@core/storage'
import { INITIAL_STATE } from '@/redux/initial-state/initial-state'
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
    id,
    storageKey,
    components,
  }) {
    this.$root = null
    this.name = name
    this.id = id
    this.components = components ?? []
    this.storeKey = storageKey
    this.store = null
    this.storeSubscriber = null
  }

  init() {
    const initialState = storage.get(this.storeKey) ?? INITIAL_STATE['excel']
    this.store = new Store(initialState, rootReducer)
    this.storeSubscriber = new StoreSubscriber(this.store)
    this.$root = this.getRoot()
    this.storeSubscriber.subscribeComponents(this.components)
    const { name, id } = this
    this.store.subscribe(this.saveState)
    this.store.dispatch(createAction(Type.PAGE_LOAD, {
      name,
      id,
    }))
  }

  getRoot() {
    throw new Error('Method must be implemented in inherited class!')
  }

  saveState = debounce((state) => {
    storage.set(this.storeKey, state)
  }, Ms.DEBOUNCE_REDUX)

  destroy() {
    console.log('Destroy page!')
    this.$root.$el.remove()
    this.storeSubscriber.unsubscribeComponents()
  }
}
