import express from 'express'
import login from './routes/auth/login.js'
import signup from './routes/auth/signup.js'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', login)
app.use('/', signup)

app.get('/', (req, res)=>{
    res.send("Hi")
})


app.listen(process.env.PORT);