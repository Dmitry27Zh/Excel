import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table table'

  constructor($root) {
    super($root, {
      name: 'Table',
      eventTypes: ['click', 'mousedown'],
    })
  }

  onClick(event) {
    console.log(`Click! ${event.target}`);
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('mousedown')
      this.addListener('mousemove')
      this.addListener('mouseup')
    }
  }

  onMousemove() {
    console.log('mousemove', this)
  }

  onMouseup() {
    console.log('mouseup')

    this.removeListener('mousemove')
    this.removeListener('mouseup')
  }
}
