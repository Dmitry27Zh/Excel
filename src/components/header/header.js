import { ExcelComponent } from '@core/excel-component';
import { $ } from '@core/dom';
import { Type } from '@/redux/type';
import { createAction } from '@/redux/actions';
import { debounce, getHash } from '@core/utils';
import { Ms, PageMeta } from '@core/constants';

export class Header extends ExcelComponent {
  static TAG_NAME = 'header'
  static CLASS_NAME = 'excel__header header'

  constructor($root, options) {
    super($root, {
      eventTypes: ['input'],
      ...options,
    })
  }

  prepare() {
    super.prepare()
    this.onInput = debounce(this.onInput, Ms.DEBOUNCE_REDUX)
  }

  toHTML() {
    const { title } = this.store.getState()

    return `
      <div class="header__container container">
        <div class="input">
          <input class="input__element" type="text" value="${title}" />
        </div>
        <div class="header__buttons">
          <a class="button" href="#${getHash(PageMeta.DASHBOARD.hash)}">
            <span class="material-icons"> exit_to_app </span>
          </a>
          <a class="button" href="#">
            <span class="material-icons"> delete </span>
          </a>
        </div>
      </div>`
  }

  onInput(event) {
    const title = $(event.target).text()
    this.storeDispatch(createAction(Type.TITLE_INPUT, title))
  }
}
