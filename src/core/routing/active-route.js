export class ActiveRoute {
  static get path() {
    return window.location.hash
  }

  static set path(hash) {
    window.location.hash = hash
  }

  static get parts() {
    return ActiveRoute.path.slice(1).split('/')
  }
}
