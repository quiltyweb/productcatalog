import 'reflect-metadata'
import Koa from 'koa'
import Router from 'koa-router'
import { createConnection } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
createConnection().then(async connection => {
  const app = new Koa()
  const router = new Router()

  router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!'
  })

  app.use(router.routes())

  app.listen(3000)

  console.log('Server running on port 3000')
}).catch(error => console.log(error))
