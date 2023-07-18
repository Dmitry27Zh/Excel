import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'
import { rootReducer } from '@/redux/root-reducer'
import { createAction } from '@/redux/actions'
import { Type } from '@/redux/type'
import { initialState } from '@/redux/initial-state'
import { Store } from '@/redux/store'
import { storage } from '@core/storage'
import { debounce } from '@core/utils'
import { Ms } from '@core/constants'

const store = new Store(initialState, rootReducer)
store.dispatch(createAction(Type.APP_LOAD))

const saveGlobalState = debounce((state) => {
  storage.set('excel-state', state)
}, Ms.DEBOUNCE_REDUX)

store.subscribe(saveGlobalState)

const excelOptions = {
  components: [Header, Toolbar, Formula, Table],
  store,
}

export const routes = {
  excel: {
    new: () => {
      return new Excel(excelOptions)
    },
    1: () => {
      return new Excel(excelOptions)
    },
  },
}
