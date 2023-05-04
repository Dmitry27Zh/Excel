import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table table'

  constructor($root) {
    super($root, {
      name: 'Table',
      eventTypes: ['click', 'mousedown'],
    })

    this.$box = $root.$el.firstElementChild
  }

  onClick(event) {
    console.log(`Click! ${event.target}`);
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      event.preventDefault()
      this.$root.$el.style.setProperty(
          '--table-height',
          this.$box.offsetHeight
      )
      this.$root.$el.style.setProperty(
          '--table-width',
          this.$box.offsetWidth
      )
      this.addListener('mousemove')
      this.addListener('mouseup')
    }
  }

  onMousemove() {
    console.log('mousemove', this)
  }

  onMouseup() {
    console.log('mouseup')
    this.$root.$el.style.setProperty(
        '--table-height',
        null
    )
    this.$root.$el.style.setProperty(
        '--table-width',
        null
    )
    this.removeListener('mousemove')
    this.removeListener('mouseup')
  }
}
