import { Router } from 'express'
import { randomUUID } from 'crypto'
import db from '../data/db.js'

const router = Router()

router.get('/', (req, res) => {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at ASC').all()
    res.json(messages)
})

router.post('/', (req, res) => {
    const id = randomUUID()
    db.prepare('INSERT INTO messages (id, user_id, text) VALUES (?, ?, ?)')
      .run(id, req.body.userId, req.body.text)
    res.status(201).json({ id, userId: req.body.userId, text: req.body.text })
})

export default router   