import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table table'

  constructor($root) {
    super($root, {
      name: 'Table',
      eventTypes: ['click'],
    })
  }

  onClick(event) {
    console.log(`Click! ${event.target}`);
  }

  toHTML() {
    return createTable()
  }
}
