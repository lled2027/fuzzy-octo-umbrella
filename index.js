import 'dotenv/config'
import {createServer} from 'http'
import { Server } from 'socket.io'
import db from './server/data/db.js'
import { randomUUID } from 'crypto'
import app from './server/app.js'
import debugFactory from 'debug'
import {handlerServerError} from './server/routes/errorsHandler.js'


const appDebug = debugFactory('app:main')
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})
const port = process.env.PORT

io.on('connection', (socket) => {
  const history = db.prepare('SELECT * FROM messages ORDER BY created_at ASC').all()
  socket.emit('history', history)

  socket.on('message', ({ userId, text }) => {
    const id = randomUUID()
    db.prepare('INSERT INTO messages (id, user_id, text) VALUES (?, ?, ?)')
      .run(id, userId, text)
    io.emit('message', { id, userId, text, timestamp: new Date().toISOString() })
  })
})


server.on('error', (error) => handlerServerError(error, port))

server.listen(port, ()=> {
    appDebug(`Server successfully listening on port %d $(port)`)
    console.log(`Server is running on port ${port}`)
})