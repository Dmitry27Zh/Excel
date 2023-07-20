import { Page } from '@/pages/page'
import { $ } from '@core/dom'

export class Unknown extends Page {
  constructor({ msg, ...nextOptions }) {
    super(nextOptions)
    this.msg = msg
    this.init()
  }

  getRoot() {
    const $root = $.create('div').html(
        `
          <p>Unknown page: <b>${this.name}</b></p>
          <p>Error: ${this.msg}</p>
        `
    )

    return $root
  }
}
