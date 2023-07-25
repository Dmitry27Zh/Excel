import { ExcelComponent } from '@core/excel-component';
import { createTable } from '@/components/table/table.template';
import { Resizer } from '@/components/table/resizer';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom'
import { Type } from '@/redux/type';
import { createAction } from '@/redux/actions';
import { parse } from '@core/parse';
import { Attr } from '@core/constants';

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

    this.resizer = null
    this.$box = null
    this.$dataCells = [],
    this.$cols = {}
    this.$rows = {}
    this.selection = null
    this.listeners = {
      'Formula:input': this.write,
      'Formula:enter': () => this.selection.current.focus(),
      'Toolbar:change tool': this.changeStyles,
    }
    this.storeListeners = {
      cellSelected: (value) => console.log(`Cell selected listened in Table Component ${JSON.stringify(value)}`),
    }
  }

  init() {
    super.init()
    this.$box = this.$root.$el.firstElementChild
    this.$dataCells = [...this.$box.querySelectorAll(
        Table.Selector.DATA_CELL
    )],
    this.$cols = this.$dataCells.reduce((result, $cell) => {
      const col = $cell.dataset.col

      if (!col) {
        return result
      }

      if (result[col]) {
        result[col].push($cell)
      } else {
        result[col] = [$cell]
      }

      return result
    }, {})
    this.$rows = this.$dataCells.reduce((result, $cell) => {
      const row = $cell.dataset.row

      if (!row) {
        return result
      }

      if (result[row]) {
        result[row].push($cell)
      } else {
        result[row] = [$cell]
      }

      return result
    }, {})
    this.resizer = new Resizer(this)
    this.selection = new TableSelection(
        this.$dataCells,
        this.$cols,
        this.$rows,
        this.observer
    )
    this.selection.init(this.store.getState().cellSelected)
  }

  toHTML() {
    const { content, tools, resize } = this.store.getState()

    return createTable(content, tools, resize)
  }

  startResize(event) {
    this.resizer.start(event)
  }

  async stopResize(event) {
    const data = await this.resizer.stop(event)
    this.storeDispatch(createAction(Type.RESIZE, data))
  }

  onMousedown(event) {
    event.preventDefault()

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

    this.storeDispatch(createAction(Type.CELL_SELECT, this.getSelectionData()))
  }

  getSelectionData() {
    const cellSelected = {
      col: this.selection.current.dataset.col,
      row: this.selection.current.dataset.row,
    }
    const groupSelected = [...this.selection.selectedGroup]
        .map((selectedCell) => {
          return {
            col: selectedCell.dataset.col,
            row: selectedCell.dataset.row,
          }
        })

    return {
      cellSelected,
      groupSelected,
    }
  }

  onClick(event) {
    this.select(event)
  }

  onKeydown(event) {
    this.select(event)
  }

  onInput(event) {
    const $cell = $(event.target)
    const text = $cell.text()
    $cell.attr(Attr.CONTENT, text)
    this.observer.notify('Table:input', text)
    this.storeInput(text)
  }

  write(text) {
    const $cell = $(this.selection.current)
    const $cellData = $cell.find(Table.Selector.CELL_DATA)
    $cell.attr(Attr.CONTENT, text)
    const parsedText = parse(text)
    $cellData.text(parsedText)
    this.storeInput(text)
  }

  storeInput(text) {
    this.storeDispatch(createAction(Type.CELL_INPUT, text))
  }

  changeStyles(styles) {
    this.selection.selectedGroup.forEach((selectedCell) => {
      Object.entries(styles).forEach(([key, value]) => {
        selectedCell.firstElementChild.style[key] = value
      })
    })
  }
}
