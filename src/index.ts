import express from 'express'

const app = express()
const port = 8000

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
