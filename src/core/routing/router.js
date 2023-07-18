import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routing/active-route'
import { routes } from '@core/routing/routes'

export class Router {
  constructor(selector) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.page = null
    this.onHashChange = this.onHashChange.bind(this)
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  }

  onHashChange() {
    const [main, param] = ActiveRoute.parts
    this.render(main, param)
  }

  render(main, param) {
    const page = routes[main]?.[param]?.()

    if (page) {
      this.$placeholder.append(page.$root)
      this.page = page
    }
  }

  destroy() {
    window.removeEventListener('hashchange', this.onHashChange)
  }
}
