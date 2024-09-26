import express from 'express'
import { verifyUser } from '../../controllers/verifyUser.js'

const router = express.Router()


router.get('/login', (req, res)=>{
    res.send("Loginroute")
})

router.post('/login', verifyUser)

export default router