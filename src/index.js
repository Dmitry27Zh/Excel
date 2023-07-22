import '@/scss/index.scss'
import { Router } from '@/routing/router'
import { Mode } from '@core/constants'

if (process.env.NODE_ENV === Mode.DEVELOPMENT) {
  window.redux = {}
}

const router = new Router('#app')
router.init()
