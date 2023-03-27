import { Excel } from './components/excel/excel'
import '@/components/excel/excel'
import '@/scss/index.scss'

const excel = new Excel('#app', {
  components: [],
})

console.log('excel', excel)
