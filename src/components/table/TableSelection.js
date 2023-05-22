import { Table } from '@/components/table/table';
import { getRange } from '@core/utils';

export class TableSelection {
  constructor($dataCells, $cols) {
    this.$dataCells = $dataCells
    this.$cols = $cols
    this.current = null
    this.selectedGroup = new Set()
  }

  init() {
    this.selectOnly(this.$dataCells[0])
  }

  startSelection($cell, shiftKey) {
    if (shiftKey) {
      const { col, row } = $cell.dataset
      const $cells = this.getGroup(col, row)
      this.selectExtra($cells)
    } else {
      this.selectOnly($cell)
    }
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
