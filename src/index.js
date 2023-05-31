import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'
import '@/scss/index.scss'
import { Store } from '@core/redux/store'
import { rootReducer } from '@core/redux/root-reducer'

const state = {}
const store = new Store(state, rootReducer)
console.log(store)

const excel = new Excel('#app', {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
})

excel.render()
