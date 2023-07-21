import { Separator } from '@core/constants'

class Storage {
  constructor() {
    this.localStorage = localStorage
  }

  get(key) {
    const item = this.localStorage.getItem(key)

    return JSON.parse(item)
  }

  set(key, data) {
    data = JSON.stringify(data)
    this.localStorage.setItem(key, data)
  }

  static generateKey(parts) {
    return parts.join(Separator.STORAGE_KEY)
  }

  getAllKeys(startStr) {
    const keys = []

    for (let i = 0; i < this.localStorage.length; i++) {
      const key = this.localStorage.key(i)

      if (key.startsWith(startStr)) {
        keys.push(key)
      }
    }

    return keys
  }

  getValues(keys) {
    return keys.map(this.get, this)
  }
}

export const storage = new Storage()
