import { ExcelComponent } from '@core/excel-component';
import { Attr } from '@core/constants';

export class Formula extends ExcelComponent {
  static CLASS_NAME = 'excel__formula formula'
  static Selector = {
    INPUT: '[data-formula="input"]',
  }

  constructor($root, settings) {
    super($root, {
      name: 'Formula',
      eventTypes: ['input', 'keydown'],
      ...settings,
    })

    this.$input = null
    this.listeners = {
      'Table:input': this.write,
      'Table:selection': ($el) => this.write($el.attr(Attr.CONTENT)),
    }
    this.storeListeners = {}
  }

  prepare() {
    super.prepare()
    this.$input = this.$root.find(Formula.Selector.INPUT)
  }

  toHTML() {
    return `
      <div class="formula__container">
        <div class="formula__info info cell"><div class="cell__data">fx</div></div>
        <div class="formula__input input">
          <input class="formula__input-element input__element" data-formula="input" type="text" />
        </div>
      </div>`
  }

  onInput(event) {
    const text = event.target.value.trim()
    this.observer.notify('Formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.observer.notify(`Formula:enter`)
    }
  }

  write(text) {
    this.$input.text(text)
  }
}
