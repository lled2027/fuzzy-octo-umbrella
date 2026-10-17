import express from 'express'
import helmet from 'helmet'

import main from './routes/main.js'

const app = express()

app.set('view engine', 'pug')

app.get(main)

export default app