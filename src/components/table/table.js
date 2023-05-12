import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';
import { Resizer } from '@/components/table/resizer';

export class Table extends ExcelComponent {
  static className = 'excel__table table'

  constructor($root) {
    super($root, {
      name: 'Table',
      eventTypes: ['mousedown'],
    })

    this.$box = $root.$el.firstElementChild
    this.resizer = new Resizer(this)
    this.$cells = [...this.$box.querySelectorAll(
        '.cell:is([data-col], [data-row])'
    )],
    this.$cols = this.$cells.reduce((result, $cell) => {
      const colNumber = $cell.dataset.col

      if (!colNumber) {
        return result
      }

      if (result[colNumber]) {
        result[colNumber].push($cell)
      } else {
        result[colNumber] = [$cell]
      }

      return result
    }, {})
    this.$rows = this.$cells.reduce((result, $cell) => {
      const rowNumber = $cell.dataset.row

      if (!rowNumber) {
        return result
      }

      if (result[rowNumber]) {
        result[rowNumber].push($cell)
      } else {
        result[rowNumber] = [$cell]
      }

      return result
    }, {})
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resizer) {
      this.resizer.start(event)
    }
  }

  onMousemove(event) {
    this.resizer.move(event)
  }

  onMouseup(event) {
    this.resizer.stop(event)
  }

  onMouseleave(event) {
    this.resizer.stop(event)
  }
}
