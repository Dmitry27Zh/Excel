const CELL_SELECTED = { col: 0, row: 0 }
const EXCEL_INITIAL_TOOLS = {
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  justifyContent: 'flex-start',
}
const INITIAL_TITLE = 'Новая'

const EXCEL_INITIAL_STATE = {
  resize: {},
  cellSelected: CELL_SELECTED,
  groupSelected: [CELL_SELECTED],
  content: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  tools: [
    [EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_TOOLS],
    [EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_TOOLS],
    [EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_TOOLS],
  ],
  isInited: false,
  isAppLoaded: false,
  title: INITIAL_TITLE,
}

export { EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_STATE}
