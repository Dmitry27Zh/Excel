import { Type } from '@/redux/type'
import { updateNestedObj } from '@core/utils'
import { copyObj } from '@core/utils'

const updateContent = (content, row, col, currentContent) => {
  content[row][col] = currentContent
}

const updateTools = (tools, groupSelected, diff) => {
  groupSelected.forEach((cellSelected) => {
    const { row, col } = cellSelected
    const currentTools = tools[row][col]
    tools[row][col] = {
      ...currentTools,
      ...diff,
    }
  })
}

export const rootReducer = (state, action) => {
  state = copyObj(state)

  switch (action.type) {
    case Type.RESIZE:
      const resize = { ...state.resize}
      updateNestedObj(resize, action.data)

      return {
        ...state,
        resize,
      }
    case Type.CELL_SELECT:
      return {
        ...state,
        ...action.data,
      }
    case Type.CELL_INPUT: {
      const { content, cellSelected: { col, row} } = state
      updateContent(content, row, col, action.data)

      return {
        ...state,
        content,
      }
    }
    case Type.CHANGE_TOOL: {
      const { tools, groupSelected } = state
      updateTools(tools, groupSelected, action.data)

      return {
        ...state,
        tools,
      }
    }
    case Type.TITLE_INPUT: {
      const title = action.data

      return {
        ...state,
        title,
      }
    }
    case Type.INIT:
      return {
        ...state,
        isInited: true,
      }
    case Type.APP_LOAD:
      return {
        ...state,
        isAppLoaded: true,
      }
    default:
      return state
  }
}
