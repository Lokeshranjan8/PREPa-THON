import express from 'express'
import { createUser } from '../../controllers/createUser.js'

const router = express.Router()

router.get('/signup', (req, res)=>{
    res.send("Singup route")
})

router.post('/signup', createUser)

export default router