import { Table } from '@/components/table/table';

export class TableSelection {
  constructor() {
    this.group = []
  }

  select($cell) {
    $cell.classList.add(Table.ClassList.SELECTED)
    this.group.push($cell)
  }

  selectGroup() {}
}
