const Ms = {
  DEBOUNCE_REDUX: 300,
}

const Attr = {
  CONTENT: 'data-content',
}

const Route = {
  UNKNOWN_PART: 'UNKNOWN_PART',
  MAIN: 'MAIN',
  SUB: 'SUB',
}

const RouteParam = {
  NEW: 'new',
}

const PageMeta = {
  DASHBOARD: {
    name: 'dashboard',
    hash: 'dashboard',
  },
  EXCEL: {
    name: 'excel',
    hash: 'excel',
  },
}

const Separator = {
  STORAGE_KEY: '-',
}

const Hash = {
  EXCEL_NEW: `${PageMeta.EXCEL.name}/${RouteParam.NEW}`,
}

export { Ms, Attr, Route, RouteParam, PageMeta, Separator, Hash }
