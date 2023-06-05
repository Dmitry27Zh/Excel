import { Type } from '@/redux/type'
import { updateNestedObj } from '@core/utils'

export const rootReducer = (state, action) => {
  switch (action.type) {
    case Type.RESIZE:
      const resize = { ...state.resize}
      updateNestedObj(resize, action.data)

      return {
        ...state,
        resize,
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
    case Type.CELL_SELECT:
      return {
        ...state,
        cellSelected: true,
      }
    default:
      return state
  }
}
