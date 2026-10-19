import express from 'express'
import helmet from 'helmet'
import debug from 'debug'
import {expressErrorHandler} from './routes/errorsHandler.js'
import main from './routes/main.js'

const app = express()
const appDebug = debug('app:main')

app.set('view engine', 'pug')
app.use(express.json())

app.use(main)

app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!')
    err.status = 400
    next(err)
})

// Register the Express error handler middleware
app.use(expressErrorHandler)

export default app