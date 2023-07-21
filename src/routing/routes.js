import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'
import { Dashboard } from '@/pages/dashboard/dashboard'
import { Unknown } from '@/pages/unknown'
import { PageMeta, Route, RouteParam } from '@core/constants'
import { getID } from '@core/utils'
import { Storage, storage } from '@core/storage'

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
  const result = {
    createPage: null,
    msg: '',
    parts,
  }
  const options = {
    name: main,
    id: param,
    storageKey: Storage.generateKey(parts),
  }

  const knownMain = main in routes

  if (!(knownMain)) {
    main = Route.UNKNOWN_PART
    result.msg = 'Unknown main part in route!'
    result.parts = [main, param]
    options.msg = result.msg
    result.createPage = routes[main].bind(null, options)

    return result
  }

  const mainRoute = routes[main]

  if (param) {
    const isNew = param === RouteParam.NEW

    if (isNew) {
      options.id = getID()
      param = options.id
      options.storageKey = Storage.generateKey([main, param])
      result.msg = `New excel:${options.id} created!`
      result.parts = [main, param]
      result.createPage = routes[main][Route.SUB].bind(null, options)

      return result
    }

    const hasSub = storage.has(options.storageKey) && Route.SUB in mainRoute

    if (hasSub) {
      result.createPage = mainRoute[Route.SUB].bind(null, options)
    } else {
      param = Route.UNKNOWN_PART
      result.msg = `${options.name} ${Route.SUB} page doesn't exist!`
      options.msg = result.msg
      result.parts = [main, param]
      result.createPage = unknownParamRoute.bind(null, options)
    }

    return result
  } else {
    const hasMain = Route.MAIN in mainRoute

    if (hasMain) {
      result.createPage = mainRoute[Route.MAIN].bind(null, options)
    } else {
      parts.main = Route.UNKNOWN_PART
      result.msg = `${options.name} ${Route.MAIN} page doesn't exist!`
      options.msg = result.msg
      result.parts = parts
      result.createPage = routes[parts.main].bind(null, options)
    }

    return result
  }
}
