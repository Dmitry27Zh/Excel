import { Excel } from '@/components/excel/excel'
import { Header } from '@/components/header/header'
import { Toolbar } from '@/components/toolbar/toolbar'
import { Formula } from '@/components/formula/formula'
import { Table } from '@/components/table/table'


const excelOptions = {
  components: [Header, Toolbar, Formula, Table],
}

const getName = (main, param) => `${main}-${param}`

export const routes = {
  excel: {
    new: () => {
      const name = getName('excel', 'new')

      return new Excel({
        ...excelOptions,
        name,
      })
    },
    1: () => {
      const name = getName('excel', 'new')

      return new Excel({
        ...excelOptions,
        name,
      })
    },
  },
}
