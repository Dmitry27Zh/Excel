import { storage } from '@core/storage'

const INITIAL_STATE = {
  resize: {},
  content: [['', '', ''], ['', '', ''], ['', '', '']],
  isInited: false,
  isAppLoaded: false,
  cellSelected: false,
}

export const initialState = storage.get('excel-state') ?? INITIAL_STATE
