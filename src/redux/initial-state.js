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

export { INITIAL_TOOLS, INITIAL_STATE}
