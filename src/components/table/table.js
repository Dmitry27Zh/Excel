import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';
import { Resizer } from '@/components/table/resizer';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom'
import { Type } from '@/redux/type';
import { createAction } from '@/redux/actions';

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
      eventTypes: ['mousedown', 'click', 'keydown', 'input'],
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
      'Formula:enter': () => this.selection.current.focus(),
    }
  }

  prepare() {
    this.selection = new TableSelection(
        this.$dataCells,
        this.$cols,
        this.$rows,
        this.observer
    )
  }

  init() {
    super.init()
    this.selection.init(this.store.getState().cellSelected)
  }

  toHTML() {
    const state = this.store.getState()

    return createTable(state.content, state.resize)
  }

  startResize(event) {
    this.resizer.start(event)
  }

  async stopResize(event) {
    const data = await this.resizer.stop(event)
    this.storeDispatch(createAction(Type.RESIZE, data))
    console.log(this.store.getState())
  }

  onMousedown(event) {
    if (Resizer.isResizer(event.target)) {
      this.startResize(event)
    }
  }

  onMousemove(event) {
    this.resizer.move(event)
  }

  async onMouseup(event) {
    this.stopResize(event)
  }

  onMouseleave(event) {
    this.stopResize(event)
  }

  select(event) {
    switch (event.type) {
      case 'click':
        const $dataCell = event.target.closest(Table.Selector.DATA_CELL)

        if ($dataCell) {
          this.selection.startMouseSelection($dataCell, event.shiftKey)
        } else {
          return
        }

        break
      case 'keydown':
        if (TableSelection.KEYS.includes(event.key)) {
          event.preventDefault()
          this.selection.startKeyboardSelection(event.key)
        } else {
          return
        }

        break
      default:
        return
    }

    this.storeDispatch(createAction(Type.CELL_SELECT, {
      col: this.selection.current.dataset.col,
      row: this.selection.current.dataset.row,
    }))
  }

  onClick(event) {
    this.select(event)
  }

  onKeydown(event) {
    this.select(event)
  }

  onInput(event) {
    const text = event.target.textContent
    this.observer.notify('Table:input', text)
    this.storeInput(text)
  }

  write(text) {
    const $cellData = $(this.selection.current).find(Table.Selector.CELL_DATA)
    $cellData.text(text)
  }

  storeListener() {
    console.log('StoreListener in Table component!')
  }

  storeInput(text) {
    this.storeDispatch(createAction(Type.CELL_INPUT, text))
  }
}
