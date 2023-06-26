import { storage } from '@core/storage'

const CELL_SELECTED = { col: 0, row: 0 }

const INITIAL_STATE = {
  resize: {},
  cellSelected: CELL_SELECTED,
  groupSelected: [CELL_SELECTED],
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
