import { $ } from '@core/dom'
import { ActiveRoute } from '@/routing/active-route'
import { getRoute } from '@/routing/routes'
import { PageMeta } from '@core/constants'
import { Loader } from '@core/loader'

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

  async onHashChange() {
    if (ActiveRoute.path === '') {
      ActiveRoute.path = PageMeta.DASHBOARD.hash

      return
    }

    const { createPage, msg } = getRoute(ActiveRoute.parts)
    console.warn(msg)
    await this.render(createPage)
  }

  async render(createPage) {
    this.page?.destroy()
    Loader.on()
    const page = await createPage()
    Loader.off()
    this.$placeholder.append(page.$root)
    this.page = page
  }

  destroy() {
    window.removeEventListener('hashchange', this.onHashChange)
  }
}
