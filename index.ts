// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import express from 'express'
import http from 'http'
import resolvers from './src/resolvers/resolvers'

// ...other imports
import { readFileSync } from 'fs'
import { AuthContext } from './src/context/AuthContext'

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./src/schemas/schema.graphql', {
  encoding: 'utf-8',
})

// Set up express and apollo server
const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer<AuthContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // To shut down properly
  introspection: true, // Enable instropection at all times, might need to change if necessary later
})
// Ensure we wait for our server to start
await server.start()

// Handle cors and use /graphql as entry point for apollo server
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    // Handle getting token from headers
    context: async ({ req }) => ({ token: req.headers.authorization }),
  }),
)

// Healthcheck endpoint
app.use('/healthcheck', (_req, res) => {
  res.status(200).send('OK')
})

const port = process.env.PORT || 3000
const host = '0.0.0.0'

// Modified server startup
await new Promise<void>(resolve =>
  httpServer.listen(
    {
      port,
      host,
    },
    resolve,
  ),
)
console.log(`🚀 Server ready at http://${host}:${port}`)
