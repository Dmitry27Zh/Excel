import { storage } from '@core/storage'
import { INITIAL_STATE } from '@/redux/initial-state/initial-state'
import { rootReducer } from '@/redux/root-reducer'
import { Store } from '@/redux/store/store'
import { StoreSubscriber } from '@/redux/store-subscriber'
import { createAction } from '@/redux/actions'
import { Type } from '@/redux/type'
import { debounce } from '@core/utils'
import { Ms } from '@core/constants'

class StateProcessor {
  constructor(client, delay = Ms.DEBOUNCE_REDUX) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    this.client.set(state)
  }

  get() {
    return this.client.get()
  }
}

class LocaleStorageClient {
  constructor(key) {
    this.key = key
  }

  set(state) {
    storage.set(this.key, state)

    return Promise.resolve()
  }

  get() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storage.get(this.key))
      }, 3000)
    })
  }
}

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
    this.storeSubscribtion = null
    this.needStore = true
    this.stateProcessor = new StateProcessor(
        new LocaleStorageClient(this.storeKey)
    )
  }

  async init() {
    await this.beforeRender()
    this.$root = this.getRoot()
    this.afterRender()
  }

  async beforeRender() {
    if (this.needStore) {
      await this.initStore()
    }
  }

  afterRender() {
    if (this.needStore) {
      this.setupStore()
    }
  }

  async initStore() {
    let initialState = await this.stateProcessor.get(this.storeKey)
    initialState = initialState ?? INITIAL_STATE[this.name] ?? {}
    this.store = new Store(initialState, rootReducer)
  }

  setupStore() {
    this.storeSubscriber = new StoreSubscriber(this.store)
    this.storeSubscriber.subscribeComponents(this.components)
    const { name, id } = this
    this.storeSubscribtion = this.store.subscribe(this.stateProcessor.listen)
    this.store.dispatch(createAction(Type.PAGE_LOAD, {
      name,
      id,
    }))
  }

  getRoot() {
    throw new Error('Method must be implemented in inherited class!')
  }

  saveState(state) {
    storage.set(this.storeKey, state)
  }

  destroy() {
    console.log('Destroy page!')
    this.$root.$el.remove()

    if (this.needStore) {
      this.storeSubscriber.unsubscribeComponents()
      this.storeSubscribtion.unsubscribe()
    }
  }
}
