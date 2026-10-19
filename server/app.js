import express from 'express'
import helmet from 'helmet'
import debug from 'debug'
import path from 'path'
import { fileURLToPath } from 'url'

import {expressErrorHandler} from './routes/errorsHandler.js'
import main from './routes/main.js'

// all variable 
const app = express()
const appDebug = debug('app:main')
const __fileURLToPath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileURLToPath)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(helmet())



app.use(main)

app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!')
    err.status = 400
    next(err)
})

// Register the Express error handler middleware
app.use(expressErrorHandler)

export default app