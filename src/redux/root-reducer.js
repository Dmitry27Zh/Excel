import { Type } from '@/redux/type'
import { updateNestedObj } from '@core/utils'

const updateCells = (state, content) => {
  const { col, row } = state.cellSelected
  let rowContent = state.cells[row]
  const cell = rowContent[col]
  rowContent = rowContent.with(col, {
    ...cell,
    content,
  })
  const cells = state.cells.with(row, rowContent)

  return cells
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
      const cells = updateCells(state, action.data)

      return {
        ...state,
        cells,
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
