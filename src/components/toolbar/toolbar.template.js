import { combineArrayItemsToGroups } from '../../core/utils'

const GROUP_LENGTH = 3

const createButton = ({ type, content }) => {
  return `
    <button class="button" type="button">
      ${content}
    </button>`
}

const createButtons = (buttons) => buttons.map(createButton).join('')

const createGroup = (buttons) => {
  return `
    <div class="toolbar__group">
      ${createButtons(buttons)}
    </div>`
}

const createGroups = (buttons) => {
  const groups = combineArrayItemsToGroups(buttons, GROUP_LENGTH)

  return groups.map((group) => createGroup(group)).join('')
}

export const createToolbar = (buttons) => {
  const groups = createGroups(buttons)

  return `
      <div class="toolbar__container container">
        <div class="toolbar__tools">
          ${groups}
        </div>
      </div>`
}
