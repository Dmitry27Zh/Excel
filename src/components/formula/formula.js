import { ExcelComponent } from '@core/excel-component';

export class Formula extends ExcelComponent {
  static CLASS_NAME = 'excel__formula formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      eventTypes: ['input'],
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

  onInput(event) {
    console.log(this.$root.$el)
    console.log(event.target)
    console.log('Formula: input', event.target.value.trim())
  }
}
