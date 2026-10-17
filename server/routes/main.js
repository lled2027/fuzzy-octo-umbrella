import { Router } from 'express'

const router = Router()

router.get('/', (res, req)=> {
    res.render('index')
})

export default router