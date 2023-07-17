import { createToolbar } from '@/components/toolbar/toolbar.template';
import { BUTTON_ATTR } from '@/components/toolbar/toolbar.template';
import { ExcelStateComponent } from '@/core/excel-state-component';
import { createAction } from '@/redux/actions';
import { Type } from '@/redux/type';
import { INITIAL_TOOLS } from '@/redux/initial-state';

export class Toolbar extends ExcelStateComponent {
  static CLASS_NAME = 'excel__toolbar toolbar'
  static Selector = {
    BUTTON: `[${BUTTON_ATTR}]`,
    BUTTON_ACTIVE: 'active',
  }
  static UNCANCELABLE_TOOLS = ['justifyContent']

  constructor(...args) {
    super(...args)
    this.eventTypes = ['click']
    this.storeListeners = {
      cellSelected: this.prepare,
    }
  }

  prepare() {
    this.initState()
    super.prepare()
  }

  toHTML() {
    return createToolbar(this.state)
  }

  onClick(event) {
    if (event.target.matches(Toolbar.Selector.BUTTON)) {
      const button = event.target.closest(Toolbar.Selector.BUTTON)
      this.changeTool(button)
    }
  }

  changeTool(button) {
    let stateDiff = JSON.parse(button.dataset.value)
    const isActive = button.classList.contains(Toolbar.Selector.BUTTON_ACTIVE)
    stateDiff = this.transformStateDiff(stateDiff, isActive)
    this.setState(stateDiff)
    this.observer.notify('Toolbar:change tool', stateDiff)
    this.storeDispatch(createAction(Type.CHANGE_TOOL, stateDiff))
  }

  transformStateDiff(stateDiff, isActive) {
    if (!isActive) {
      return stateDiff
    }

    const tool = Object.keys(stateDiff)[0]

    const cancelTool = () => {
      const initialValue = INITIAL_TOOLS[tool]
      stateDiff[tool] = initialValue
    }

    if (!Toolbar.UNCANCELABLE_TOOLS.includes(tool)) {
      cancelTool()
    }

    return stateDiff
  }

  initState() {
    const { cellSelected: { row, col }, tools } = this.store.getState()
    const state = tools[row][col]
    super.initState(state)
  }
}
