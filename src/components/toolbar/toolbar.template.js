import { combineArrayItemsToGroups } from '@core/utils'
import { Toolbar } from '@/components/toolbar/toolbar'

const GROUP_LENGTH = 3
const BUTTON_ATTR = 'data-type="button"'
const BUTTONS = [
  {
    content: '<span class="material-icons">format_align_left</span>',
    value: { justifyContent: 'flex-start' },
  },
  {
    content: '<span class="material-icons">format_align_center</span>',
    value: { justifyContent: 'center' },
  },
  {
    content: '<span class="material-icons">format_align_right</span>',
    value: { justifyContent: 'flex-end' },
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

const isActive = (value, state) => {
  const valueKey = Object.keys(value)[0]
  const buttonValue = value[valueKey]
  const stateValue = state[valueKey]
  return buttonValue === stateValue
}

const createButton = ({ content, value }, state) => {
  const valueAttr = `data-value=${JSON.stringify(value)}`
  const actionClass = isActive(value, state) ?
    Toolbar.Selector.BUTTON_ACTIVE : ''

  return `
    <button class="button ${actionClass}" type="button" ${BUTTON_ATTR} ${valueAttr}>
      ${content}
    </button>`
}

const createButtons = (buttons, state) => {
  return buttons.map((button) => createButton(button, state)).join('')
}

const createGroup = (buttons, state) => {
  return `
    <div class="toolbar__group">
      ${createButtons(buttons, state)}
    </div>`
}

const createGroups = (buttons, state) => {
  const groups = combineArrayItemsToGroups(buttons, GROUP_LENGTH)

  return groups.map((group) => createGroup(group, state)).join('')
}

const createToolbar = (state) => {
  const groups = createGroups(BUTTONS, state)

  return `
      <div class="toolbar__container container">
        <div class="toolbar__tools">
          ${groups}
        </div>
      </div>`
}

export { createToolbar, BUTTON_ATTR}
