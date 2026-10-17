import {createServer} from 'http'
import app from './server/app.js'


const server = createServer(app), port = 1234

server.listen(port)