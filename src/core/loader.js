export class Loader {
  static on() {
    document.body.style.cursor = 'wait'
  }

  static off() {
    document.body.style.cursor = ''
  }
}
