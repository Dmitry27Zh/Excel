import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routing/active-route'
import { getRoute } from '@core/routing/routes'
import { PageMeta, Hash } from '@core/constants'
import { getID } from '@core/utils'

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
    let route

    if (ActiveRoute.path === '') {
      ActiveRoute.path = PageMeta.DASHBOARD.hash

      return
    }


    const parts = ActiveRoute.parts

    if (ActiveRoute.path === Hash.EXCEL_NEW) {
      console.log(getID())
    }

    try {
      route = getRoute(parts)
    } catch (e) {
      route = e.route
      console.warn(e)
    }

    this.render(route)
  }

  render(route) {
    const page = route()
    this.page?.destroy()
    this.$placeholder.append(page.$root)
    this.page = page
  }

  destroy() {
    window.removeEventListener('hashchange', this.onHashChange)
  }
}
