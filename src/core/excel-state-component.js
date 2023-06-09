import { ExcelComponent } from '@core/excel-component';

export class ExcelStateComponent extends ExcelComponent {
  initState(initialState) {
    this.state = { ...initialState }
  }

  setState(state) {
    this.state = { ...this.state, ...state}
    console.log(state)
  }
}
