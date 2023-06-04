import { Action } from '@/redux/action'

export const rootReducer = (state, action) => {
  switch (action.type) {
    case Action.RESIZE:
      const resize = { ...state.resize}
      Object.keys(action.data).forEach((key) => {
        const currentData = resize[key]
        const nextData = action.data[key]
        resize[key] = { ...currentData, ...nextData }
      })

      return {
        ...state,
        resize,
      }
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
