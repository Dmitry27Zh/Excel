import { storage } from '@core/storage'

const CELL_SELECTED = { col: 0, row: 0 }
const INITIAL_TOOLS = {
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  justifyContent: 'flex-start',
}
const INITIAL_TITLE = 'Новая'

const INITIAL_STATE = {
  resize: {},
  cellSelected: CELL_SELECTED,
  groupSelected: [CELL_SELECTED],
  content: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  tools: [
    [INITIAL_TOOLS, INITIAL_TOOLS, INITIAL_TOOLS],
    [INITIAL_TOOLS, INITIAL_TOOLS, INITIAL_TOOLS],
    [INITIAL_TOOLS, INITIAL_TOOLS, INITIAL_TOOLS],
  ],
  isInited: false,
  isAppLoaded: false,
  title: INITIAL_TITLE,
}

const initialState = storage.get('excel-state') ?? INITIAL_STATE

export { INITIAL_TOOLS, initialState}
