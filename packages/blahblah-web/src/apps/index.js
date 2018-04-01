import Router from 'koa-router'

const router = new Router({
  prefix: '/monitor',
})

router.get('/l7check', async ctx => {
  ctx.status = 200
})

export default router
