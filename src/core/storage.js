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
}

export const storage = new Storage()
