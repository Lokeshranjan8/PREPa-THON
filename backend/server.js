const express = require('express')
const cors = require('cors')
const fs=require('fs')
const csv = require('csv-parser')
const { error } = require('console');


const app = express();
app.use(cors())
const port = 5000

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

//fethcing data from xml file
app.get('/companies',(req,res)=>{
    const result=[];
    fs.createReadStream('mock.csv')
      .pipe(csv())
      .on('data', (data) => result.push(data))
      .on('end', () => {
        res.json(result)
      })
      .on('error',(error)=>{
          res.status(400).json({error:'Error while fetching data'})
      })
  
})