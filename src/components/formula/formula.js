import { ExcelComponent } from '@core/excel-component';

export class Formula extends ExcelComponent {
  static className = 'excel__formula formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }

  toHTML() {
    return `
      <div class="formula__container">
        <div class="formula__info info cell">fx</div>
        <div class="formula__input input">
          <input class="formula__input-element input__element" type="text" />
        </div>
      </div>`
  }
}
