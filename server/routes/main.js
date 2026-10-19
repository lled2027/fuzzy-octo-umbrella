import { Router } from 'express'
import { randomUUID } from 'crypto'
import db from '../data/db.js'

const router = Router()

router.post('/', (req, res) => {
    const id = randomUUID()
    db.prepare('INSERT INTO users (id, name) VALUES (?, ?)').run(id, req.body.name)
    res.json({ id, name: req.body.name })
})

export default router