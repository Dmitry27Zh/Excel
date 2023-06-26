import { ExcelComponent } from '@core/excel-component';

export class ExcelStateComponent extends ExcelComponent {
  initState(state) {
    this.state = { ...state }
  }

  setState(state) {
    this.state = { ...this.state, ...state}
    this.render()
  }
}
