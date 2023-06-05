import { storage } from '@core/storage'

const INITIAL_STATE = {
  resize: {},
  cellSelected: { col: 0, row: 0 },
  content: [['', '', ''], ['', '', ''], ['', '', '']],
  isInited: false,
  isAppLoaded: false,
}

export const initialState = storage.get('excel-state') ?? INITIAL_STATE
