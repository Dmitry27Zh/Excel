import { Type } from '@/redux/type'
import { updateNestedObj } from '@core/utils'

const updateTableContent = (state, text) => {
  const { col, row } = state.cellSelected
  let rowContent = state.content[row]
  rowContent = rowContent.with(col, text)
  const content = state.content.with(row, rowContent)

  return content
}

export const rootReducer = (state, action) => {
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
        cellSelected: action.data,
      }
    case Type.CELL_INPUT:
      const content = updateTableContent(state, action.data)

      return {
        ...state,
        content,
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
