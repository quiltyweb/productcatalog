import 'reflect-metadata'
import Koa from 'koa'
import Router from 'koa-router'
import { createConnection } from 'typeorm'
import { ApolloServer, gql } from 'apollo-server-koa'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
createConnection().then(async connection => {
  const app = new Koa()
  const router = new Router()

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `
  const resolvers = {
    Query: {
      hello: (): string => 'world'
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers })
  app.use(server.getMiddleware())

  router.get('/', async (ctx) => {
    ctx.body = 'Hello World!'
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())

  server.applyMiddleware({ app })

  app.listen(3000)

  console.log('Server running on port 3000')
}).catch(error => console.log(error))
