import { Table } from '@/components/table/table';

export class TableSelection {
  constructor($dataCells) {
    this.$dataCells = $dataCells
    this.selected = null
    this.selectedGroup = new Set()
  }

  init() {
    this.select(this.$dataCells[0])
    this.addListeners()
  }

  select($cell) {
    this.unselectGroup()
    this.selectedGroup.add($cell)
    $cell.classList.add(Table.ClassList.SELECTED)

    if ($cell.matches(':focus')) {
      this.unSelect(this.selected)
      this.selected = $cell
    }
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
    $cells.forEach(this.select, this)
  }

  unselectGroup($cells = this.selectedGroup) {
    $cells.forEach(this.unSelect, this)
  }

  addListeners() {
    this.$dataCells.forEach(($dataCell) => {
      $dataCell.addEventListener('focus', () => this.select($dataCell))
    })
  }
}
