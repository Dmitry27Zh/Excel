import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';
import { Resizer } from '@/components/table/resizer';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static CLASS_NAME = 'excel__table table'
  static Selector = {
    RESIZE: '[data-resize]',
    DATA_CELL: '[data-cell]',
    CELL_DATA: '.cell__data',
  }
  static ClassList = {
    SELECTED: 'selected',
  }

  constructor($root, settings) {
    super($root, {
      name: 'Table',
      eventTypes: ['mousedown', 'click', 'keydown'],
      ...settings,
    })

    this.$box = $root.$el.firstElementChild
    this.resizer = new Resizer(this)
    this.$dataCells = [...this.$box.querySelectorAll(
        Table.Selector.DATA_CELL
    )],
    this.$cols = this.$dataCells.reduce((result, $cell) => {
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
    this.$rows = this.$dataCells.reduce((result, $cell) => {
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
    this.selection = null
    this.listeners = {
      'Formula:input': this.write,
    }
  }

  prepare() {
    this.selection = new TableSelection(this.$dataCells, this.$cols, this.$rows)
  }

  init() {
    super.init()
    this.selection.init()
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (Resizer.isResizer(event.target)) {
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

  onClick(event) {
    const $dataCell = event.target.closest(Table.Selector.DATA_CELL)

    if ($dataCell) {
      this.selection.startMouseSelection($dataCell, event.shiftKey)
    }
  }

  onKeydown(event) {
    if (TableSelection.KEYS.includes(event.key)) {
      event.preventDefault()
      this.selection.startKeyboardSelection(event.key)
    }
  }

  write(text) {
    const $cellData = $(this.selection.current).find(Table.Selector.CELL_DATA)
    $cellData.write(text)
  }
}
