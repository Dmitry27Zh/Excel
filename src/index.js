import '@/scss/index.scss'
import { Router } from '@core/routing/router'
import { routes } from '@core/routing/routes'

const router = new Router('#app', routes)
router.init()
