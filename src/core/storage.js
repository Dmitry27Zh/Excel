import { Separator } from '@core/constants'
import { Loader } from '@core/loader'

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

  has(key) {
    return !!this.localStorage.getItem(key)
  }

  async delete(key) {
    Loader.on()

    try {
      await new Promise((resolve, reject) => {
        if (this.has(key)) {
          this.localStorage.removeItem(key)
          resolve()
        } else {
          reject()
        }
      })
    } catch (e) {
      console.warn(`Failed storage delete: ${e}`)
      throw e
    } finally {
      Loader.off()
    }
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

const storage = new Storage()

export { Storage, storage }
