import { Type } from '@/redux/type'
import { updateNestedObj } from '@core/utils'

const updateCell = (cells, { col, row, ...newData}) => {
  let cellsInRow = cells[row]
  const oldData = cellsInRow[col]
  cellsInRow = cellsInRow.with(col, {
    ...oldData,
    ...newData,
  })
  cells = cells.with(row, cellsInRow)

  return cells
}

const updateCells = (cells, dataList) => {
  dataList.forEach((data) => {
    cells = updateCell(cells, data)
  })

  return cells
}

const updateTools = (cells, groupSelected, tools) => {
  const dataList = groupSelected.map(({ col, row }) => {
    return {
      col, row, tools,
    }
  })

  return updateCells(cells, dataList)
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
        ...action.data,
      }
    case Type.CELL_INPUT: {
      let { cells, cellSelected: { col, row} } = state
      cells = updateCells(cells, [{ col, row, content: action.data }])

      return {
        ...state,
        cells,
      }
    }
    case Type.CHANGE_TOOL: {
      let { cells, groupSelected } = state
      cells = updateTools(cells, groupSelected, action.data)

      return {
        ...state,
        cells,
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
