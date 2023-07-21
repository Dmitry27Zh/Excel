export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static set path(hash) {
    window.location.hash = hash
  }

  static get parts() {
    return ActiveRoute.path.split('/')
  }
}
