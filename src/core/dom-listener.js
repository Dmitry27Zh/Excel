export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DOMListener!')
    }

    this.$root = $root
    this.listeners = listeners
  }

  addListeners() {
    this.$root.$el.addEventListener(this.listeners[0],
        () => console.log(`Добавлен слушатель ${this.listeners[0]}`)
    )
  }
}
