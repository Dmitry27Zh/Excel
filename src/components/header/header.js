import { ExcelComponent } from '@core/excel-component';

export class Header extends ExcelComponent {
  static tagName = 'header'
  static className = 'excel__header header'

  toHTML() {
    return `
      <div class="header__container container">
        <div class="input">
          <input class="input__element" type="text" value="Новая таблица" />
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
}
