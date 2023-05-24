import { ExcelComponent } from '@core/excel-component';

export class Formula extends ExcelComponent {
  static CLASS_NAME = 'excel__formula formula'

  constructor($root, settings) {
    super($root, {
      name: 'Formula',
      eventTypes: ['input'],
      ...settings,
    })
  }

  toHTML() {
    return `
      <div class="formula__container">
        <div class="formula__info info cell"><div class="cell__data">fx</div></div>
        <div class="formula__input input">
          <input class="formula__input-element input__element" type="text" />
        </div>
      </div>`
  }

  onInput(event) {
    this.observer.notify('Formula:input', event.target.value)
  }
}
