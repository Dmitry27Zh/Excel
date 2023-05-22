import { Table } from '@/components/table/table';

export class TableSelection {
  constructor($dataCells) {
    this.$dataCells = $dataCells
    this.selected = null
    this.selectedGroup = new Set()
  }

  init() {
    this.selectOnly(this.$dataCells[0])
  }

  startSelection($cell, shiftKey) {
    if (shiftKey) {
      this.selectExtra($cell)
    } else {
      this.selectOnly($cell)
    }
  }

  select($cell) {
    this.selectedGroup.add($cell)
    $cell.classList.add(Table.ClassList.SELECTED)

    if ($cell.matches(':focus')) {
      console.log('prev', this.selected)
      this.selected = $cell
      console.log('next', this.selected)
    }
  }

  selectOnly($cell) {
    this.unselectGroup()
    this.select($cell)
  }

  selectExtra($cell) {
    this.select($cell)
  }

  unSelect($cell) {
    if (!$cell) {
      return
    }

    this.selectedGroup.delete($cell)
    $cell.classList.remove(Table.ClassList.SELECTED)

    if (this.selected === $cell) {
      this.selected = null
    }
  }

  selectGroup($cells) {
    $cells.forEach(this.selectExtra, this)
  }

  unselectGroup($cells = this.selectedGroup) {
    $cells.forEach(this.unSelect, this)
  }
}
