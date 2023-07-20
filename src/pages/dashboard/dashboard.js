import { Page } from '@/pages/page'
import { $ } from '@core/dom'

export class Dashboard extends Page {
  constructor(options) {
    super(options)
    this.init()
  }

  getRoot() {
    const $root = $.create('div').html(
        `<h1>${this.name}</h1>`
    )

    return $root
  }
}
