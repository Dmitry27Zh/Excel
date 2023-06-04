import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'
import '@/scss/index.scss'
import { Store } from '@/redux/store'
import { rootReducer } from '@/redux/root-reducer'
import { createAction } from '@/redux/actions'
import { Type } from '@/redux/type'
import { storage } from '@core/storage'

const INITIAL_STATE = {
  resize: {},
  isInited: false,
  isAppLoaded: false,
  cellSelected: false,
}

const state = storage.get('excel-state') ?? INITIAL_STATE
const store = new Store(state, rootReducer)
console.log(store.getState())
store.dispatch(createAction(Type.APP_LOAD))
console.log(store.getState())

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

window.excel = excel

excel.render()
