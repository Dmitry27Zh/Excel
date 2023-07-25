const CELL_SELECTED = { col: 0, row: 0 }
const EXCEL_INITIAL_TOOLS = {
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  justifyContent: 'flex-start',
}
const INITIAL_TITLE = 'Новая'
const contentRow = new Array(26).fill('')
const content = new Array(100).fill().map(() => contentRow.slice())
const toolsRow = new Array(26).fill().map(() => ({ ...EXCEL_INITIAL_TOOLS }))
const tools = new Array(100).fill().map(() => toolsRow.slice())

const EXCEL_INITIAL_STATE = {
  resize: {},
  cellSelected: CELL_SELECTED,
  groupSelected: [CELL_SELECTED],
  content,
  tools,
  isInited: false,
  isAppLoaded: false,
  title: INITIAL_TITLE,
}

export { EXCEL_INITIAL_TOOLS, EXCEL_INITIAL_STATE}
