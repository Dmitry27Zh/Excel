import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'
import '@/scss/index.scss'
import { Store } from '@/redux/store'
import { rootReducer } from '@/redux/root-reducer'

const state = {
  resize: {},
  isInited: false,
  isAppLoaded: false,
  cellSelected: false,
}
const store = new Store(state, rootReducer)
console.log(store.getState())
store.dispatch({
  type: '__APP_LOAD__',
})
console.log(store.getState())

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

window.excel = excel

excel.render()
