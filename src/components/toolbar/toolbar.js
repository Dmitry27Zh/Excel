import { ExcelComponent } from '@core/excel-component';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar toolbar'

  toHTML() {
    return `
      <div class="toolbar__container container">
        <div class="toolbar__tools">
          <div class="toolbar__group">
            <button class="button" type="button">
              <span class="material-icons"> format_align_left </span>
              </button>
            <button class="button" type="button">
              <span class="material-icons"> format_align_center </span>
              </button>
            <button class="button" type="button">
              <span class="material-icons"> format_align_right </span>
              </button>
          </div>
          <div class="toolbar__group">
            <button class="button" type="button">
              <span class="material-icons"> format_bold </span>
              </button>
            <button class="button" type="button">
              <span class="material-icons"> format_italic </span>
              </button>
            <button class="button" type="button">
              <span class="material-icons"> format_underlined </span>
              </button>
          </div>
        </div>
      </div>`
  }
}
