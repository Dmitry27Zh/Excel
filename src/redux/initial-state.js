import { storage } from '@core/storage'

const INITIAL_STATE = {
  resize: {},
  cellSelected: { col: 0, row: 0 },
  cells: [
    [
      {
        content: '',
        tools: {},
      },
      {
        content: '',
        tools: {},
      },
      {
        content: '',
        tools: {},
      },
    ],
    [
      {
        content: '',
        tools: {},
      },
      {
        content: '',
        tools: {},
      },
      {
        content: '',
        tools: {},
      },
    ],
    [
      {
        content: '',
        tools: {},
      },
      {
        content: '',
        tools: {},
      },
      {
        content: '',
        tools: {},
      },
    ],
  ],
  isInited: false,
  isAppLoaded: false,
}

export const initialState = storage.get('excel-state') ?? INITIAL_STATE
