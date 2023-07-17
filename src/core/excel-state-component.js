import { ExcelComponent } from '@core/excel-component';

export class ExcelStateComponent extends ExcelComponent {
  initState(state) {
    this.state = { ...state }
  }

  setState(stateDiff) {
    this.state = { ...this.state, ...stateDiff}
    this.render()
  }
}
