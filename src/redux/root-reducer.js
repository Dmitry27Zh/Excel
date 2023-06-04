import { Type } from '@/redux/type'

export const rootReducer = (state, action) => {
  switch (action.type) {
    case Type.RESIZE:
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
