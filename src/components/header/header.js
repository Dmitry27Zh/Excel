import { ExcelComponent } from '@core/excel-component';
import { $ } from '@core/dom';
import { Type } from '@/redux/type';
import { createAction } from '@/redux/actions';

export class Header extends ExcelComponent {
  static TAG_NAME = 'header'
  static CLASS_NAME = 'excel__header header'

  constructor($root, options) {
    super($root, {
      eventTypes: ['input'],
      ...options,
    })
  }

  toHTML() {
    const { title } = this.store.getState()

    return `
      <div class="header__container container">
        <div class="input">
          <input class="input__element" type="text" value="${title}" />
        </div>
        <div class="header__buttons">
          <button class="button" type="button">
            <span class="material-icons"> exit_to_app </span>
          </button>
          <button class="button" type="button">
            <span class="material-icons"> delete </span>
          </button>
        </div>
      </div>`
  }

  onInput(event) {
    const title = $(event.target).text()
    this.storeDispatch(createAction(Type.TITLE_INPUT, title))
  }
}
