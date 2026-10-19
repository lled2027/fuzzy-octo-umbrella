import { Router } from 'express'

const router = Router()

router.get('/', (res, req)=> {
    res.render('index', {  title: 'Home Page' })
})

export default router