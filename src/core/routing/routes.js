import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'
import { Dashboard } from '@/pages/dashboard/dashboard'
import { Unknown } from '@/pages/unknown'
import { PageMeta, Route } from '@core/constants'

const excelOptions = {
  components: [Header, Toolbar, Formula, Table],
}

const unknownParamRoute = (options) => {
  return new Unknown(options)
}

const routes = {
  [PageMeta.EXCEL.name]: {
    [Route.SUB]: (options) => {
      return new Excel({
        ...excelOptions,
        ...options,
      })
    },
    [Route.UNKNOWN_PART]: unknownParamRoute,
  },
  [PageMeta.DASHBOARD.name]: {
    [Route.MAIN]: (options) => {
      return new Dashboard({
        ...options,
      })
    },
  },
  [Route.UNKNOWN_PART]: (options) => {
    return new Unknown(options)
  },
}

export const getRoute = (parts) => {
  let [main, param] = parts
  const options = {
    name: main,
    id: param,
  }

  if (!(main in routes)) {
    parts.main = Route.UNKNOWN_PART
    options.msg = 'Unknown main part in route!'
    const error = new Error(options.msg)
    error.parts = parts
    error.route = routes[parts.main].bind(null, options)
    throw error
  }

  const mainRoute = routes[main]

  if (param && !(param in mainRoute)) {
    parts.param = Route.UNKNOWN_PART
    options.msg = 'Unknown param part in route!'
    const error = new Error(options.msg)
    error.parts = parts
    error.route = mainRoute[parts.param] ?? unknownParamRoute
    error.route = error.route.bind(null, options)
    throw error
  }

  param = param ?? Route.MAIN

  if (!(param in mainRoute)) {
    parts.main = Route.UNKNOWN_PART
    options.msg = `${options.name} main page doesn't exist!`
    const error = new Error(options.msg)
    error.parts = parts
    error.route = routes[parts.main].bind(null, options)
    throw error
  }

  return mainRoute[param].bind(null, options)
}
