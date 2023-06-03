import { Action } from '@/redux/action'

export const rootReducer = (state, action) => {
  switch (action.type) {
    case Action.INIT:
      return {
        ...state,
        isInited: true,
      }
    case Action.APP_LOAD:
      return {
        ...state,
        isAppLoaded: true,
      }
    case Action.CELL_SELECT:
      return {
        ...state,
        cellSelected: true,
      }
    default:
      return state
  }
}
