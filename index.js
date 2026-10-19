import 'dotenv/config'
import {createServer} from 'http'
import app from './server/app.js'
import debugFactory from 'debug'
import {handlerServerError} from './server/routes/errorsHandler.js'


const appDebug = debugFactory('app:main')
const server = createServer(app)
const port = process.env.PORT


server.on('error', (error) => handlerServerError(error, port))

server.listen(port, ()=> {
    appDebug(`Server successfully listening on port %d $(port)`)
    console.log(`Server is running on port ${port}`)
})