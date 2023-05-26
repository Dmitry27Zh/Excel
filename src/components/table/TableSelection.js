import { Table } from '@/components/table/table';
import { getRange, clamp } from '@core/utils';
import { $ } from '@core/dom';

export class TableSelection {
  static KEYS = [
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ]

  constructor($dataCells, $cols, $rows, observer) {
    this.$dataCells = $dataCells
    this.$cols = $cols
    this.$rows = $rows
    this.observer = observer
    this.current = null
    this.selectedGroup = new Set()
    this.minCol = 0
    this.minRow = 0
    this.maxCol = Math.max(...Object.keys(this.$cols))
    this.maxRow = Math.max(...Object.keys(this.$rows))
  }

  init() {
    this.selectOnly(this.$dataCells[0])
  }

  startMouseSelection($cell, shiftKey) {
    if (shiftKey) {
      const { col, row } = $cell.dataset
      const $cells = this.getGroup(col, row)
      this.selectExtra($cells)
    } else {
      this.selectOnly($cell)
    }
  }

  startKeyboardSelection(key) {
    let { col, row } = this.current.dataset
    let $nextCell = null

    switch (key) {
      case 'Tab':
        col++
        break
      case 'Enter':
        row++
        break
      case 'ArrowLeft':
        col--
        break
      case 'ArrowRight':
        col++
        break
      case 'ArrowUp':
        row--
        break
      case 'ArrowDown':
        row++
        break
    }

    col = clamp(col, this.minCol, this.maxCol)
    row = clamp(row, this.minRow, this.maxRow)
    $nextCell = this.$cols[col][row]
    this.selectOnly($nextCell)
  }

  select($cell) {
    if (this.isSelected($cell)) {
      return
    }

    this.selectedGroup.add($cell)
    $cell.classList.add(Table.ClassList.SELECTED)
  }

  selectOnly($cell) {
    this.unSelectAll()
    this.select($cell)
    this.current = $cell
    this.current.focus()
    this.observer.notify('Table:selection', $(this.current).text())
  }

  selectExtra($cells) {
    this.unSelectExtra()
    $cells.forEach(this.select, this)
  }

  unSelect($cell) {
    if (!$cell) {
      return
    }

    this.selectedGroup.delete($cell)
    $cell.classList.remove(Table.ClassList.SELECTED)

    if (this.current === $cell) {
      this.current.blur()
      this.current = null
    }
  }

  unselectGroup($cells) {
    $cells.forEach(this.unSelect, this)
  }

  unSelectAll() {
    this.unselectGroup(this.selectedGroup)
  }

  unSelectExtra() {
    const extra = new Set(this.selectedGroup)
    extra.delete(this.current)
    this.unselectGroup(extra)
  }

  isSelected($cell) {
    return this.selectedGroup.has($cell)
  }

  getGroup(newCol, newRow) {
    const { col, row } = this.current.dataset
    const colRange = getRange(col, newCol)
    const rowRange = getRange(row, newRow)

    const groupCoords = colRange.reduce((result, colValue) => {
      const currentCoords = rowRange.map((rowValue) => [colValue, rowValue])
      return result.concat(currentCoords)
    }, [])

    return groupCoords.map(([col, row]) => this.$cols[col][row])
  }
}
