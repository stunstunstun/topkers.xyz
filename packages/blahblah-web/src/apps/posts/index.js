import Router from 'koa-router'
import { getDevlog, getGitHubTrending, getReddit } from './posts.controller'

const router = new Router({
  prefix: '/api/providers',
})

router.get('/devlog/posts', getDevlog)
router.get('/github/posts', getGitHubTrending)
router.get('/reddit/posts', getReddit)

export default router
