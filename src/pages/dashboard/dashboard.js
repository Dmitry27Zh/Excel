import { Page } from '@/pages/page'
import { $ } from '@core/dom'
import { getRecordsTemplate }
  from '@/pages/dashboard/dashboard.records-template'
import { PageMeta, RouteParam } from '@core/constants'

export class Dashboard extends Page {
  constructor(options) {
    super(options)
    this.init()
  }

  getRoot() {
    const $root = $.create('div', 'dashboard').html(
        `
          <header>
            <div class="container container--restricted">
              <h1 class="page-title">Таблицы</h1>
            </div>
          </header>
          <div class="dashboard__new">
            <div class="container container--restricted">
              <a class="button btn-bg" href="#${PageMeta.EXCEL.name}/${RouteParam.NEW}">Новая таблица</a>
            </div>
          </div>
          <div class="dashboard__table">
            <div class="dashboard__table-container container container--restricted">
              <ul class="list">
                ${getRecordsTemplate()}
              </ul>
            </div>
          </div>
        `
    )

    return $root
  }
}
