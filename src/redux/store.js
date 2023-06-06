import { createAction } from '@/redux/actions'
import { Type } from '@/redux/type'
import { storage } from '@core/storage'
import { copyObj } from '@core/utils'

export class Store {
  constructor(state, rootReducer) {
    this.state = rootReducer(state, createAction(Type.INIT))
    this.rootReducer = rootReducer
    this.listeners = []
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach((listener) => listener())
    storage.set('excel-state', this.state)
  }

  subscribe(listener) {
    this.listeners.push(listener)

    return {
      unsubscribe() {
        this.listeners = this.listeners
            .filter((listener) => listener !== listener)
      },
    }
  }

  getState() {
    return copyObj(this.state)
  }
}
