import { createToolbar } from '@/components/toolbar/toolbar.template';
import { BUTTON_ATTR } from '@/components/toolbar/toolbar.template';
import { ExcelStateComponent } from '@/core/excel-state-component';

export class Toolbar extends ExcelStateComponent {
  static CLASS_NAME = 'excel__toolbar toolbar'
  static Selector = {
    BUTTON: `[${BUTTON_ATTR}]`,
    BUTTON_ACTIVE: 'active',
  }
  static BUTTONS = [
    {
      content: '<span class="material-icons">format_align_left</span>',
      value: { textAlign: 'left' },
    },
    {
      content: '<span class="material-icons">format_align_center</span>',
      value: { textAlign: 'center' },
    },
    {
      content: '<span class="material-icons">format_align_right</span>',
      value: { textAlign: 'right' },
    },
    {
      content: '<span class="material-icons">format_bold</span>',
      value: { fontWeight: 'bold' },
    },
    {
      content: '<span class="material-icons">format_italic</span>',
      value: { fontStyle: 'italic' },
    },
    {
      content: '<span class="material-icons">format_underline</span>',
      value: { textDecoration: 'underline' },
    },
  ]
  static DEFAULT_STATE = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
  }

  constructor(...args) {
    super(...args)
    this.eventTypes = ['click']
  }

  prepare() {
    const initialState = {
      ...Toolbar.DEFAULT_STATE,
      textAlign: 'left',
      fontStyle: 'italic',
      textDecoration: 'underline',
    }
    this.initState(initialState)
    super.prepare()
  }

  toHTML() {
    return createToolbar(Toolbar.BUTTONS, this.state)
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
}
