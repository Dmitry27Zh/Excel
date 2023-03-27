import { ExcelComponent } from '@core/excel-component';

export class Table extends ExcelComponent {
  static className = 'excel__table table'

  toHTML() {
    return `
      <div class="table__row">
        <div class="table__info table__info-empty cell"></div>
        <div class="table__data">
          <div class="table__cell table__head cell">A</div>
          <div class="table__cell table__head cell">B</div>
          <div class="table__cell table__head cell">C</div>
          <div class="table__cell table__head cell">D</div>
          <div class="table__cell table__head cell">E</div>
          <div class="table__cell table__head cell">J</div>
          <div class="table__cell table__head cell">K</div>
        </div>
      </div>
      <div class="table__row">
        <div class="table__info cell">1</div>
        <div class="table__data">
          <div class="table__cell cell" contenteditable>smt1</div>
          <div class="table__cell cell" contenteditable>smt1</div>
          <div class="table__cell cell" contenteditable>smt1</div>
          <div class="table__cell cell" contenteditable>smt1</div>
          <div class="table__cell cell" contenteditable>smt1</div>
          <div class="table__cell cell" contenteditable>smt1</div>
          <div class="table__cell cell" contenteditable>smt1</div>
        </div>
      </div>
      <div class="table__row">
        <div class="table__info cell">2</div>
        <div class="table__data">
          <div class="table__cell cell" contenteditable>smt2</div>
          <div class="table__cell cell" contenteditable>smt2</div>
          <div class="table__cell cell" contenteditable>smt2</div>
          <div class="table__cell cell" contenteditable>smt2</div>
          <div class="table__cell cell" contenteditable>smt2</div>
          <div class="table__cell cell" contenteditable>smt2</div>
          <div class="table__cell cell" contenteditable>smt2</div>
        </div>
      </div>`
  }
}
