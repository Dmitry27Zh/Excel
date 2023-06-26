import { createToolbar } from '@/components/toolbar/toolbar.template';
import { BUTTON_ATTR } from '@/components/toolbar/toolbar.template';
import { ExcelStateComponent } from '@/core/excel-state-component';
import { createAction } from '@/redux/actions';
import { Type } from '@/redux/type';

export class Toolbar extends ExcelStateComponent {
  static CLASS_NAME = 'excel__toolbar toolbar'
  static Selector = {
    BUTTON: `[${BUTTON_ATTR}]`,
    BUTTON_ACTIVE: 'active',
  }
  static DEFAULT_STATE = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
  }
  static INITIAL_STATE = {
    justifyContent: 'flex-start',
  }

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
    this.storeDispatch(createAction(Type.CHANGE_TOOL, this.state))
  }

  transformStateDiff(stateDiff, isActive) {
    if (!isActive) {
      return stateDiff
    }

    const key = Object.keys(stateDiff)[0]
    const defaultValue = Toolbar.DEFAULT_STATE[key]

    if (defaultValue != null) {
      stateDiff[key] = defaultValue
    }

    return stateDiff
  }

  initState() {
    const state = this.getState()
    super.initState(state)
  }

  getState() {
    const { cells, cellSelected } = this.store.getState()
    const { col, row } = cellSelected
    const state = cells[row][col].tools

    return {
      ...Toolbar.DEFAULT_STATE,
      ...Toolbar.INITIAL_STATE,
      ...state,
    }
  }
}
