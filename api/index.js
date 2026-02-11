const express = require('express')
const app = express()
const cors = require('cors'); // Required to allow requests from a different origin (your React app)

app.use(cors()); // Enables all CORS requests
app.use(express.json()); // Parses JSON bodies


app.get('/',(req,res)=>{
   res.send('hello')
})

app.post('/user',(req,res)=>{
    const {username, password} = req.body
    res.json({data: {username, password}})

})



app.listen(5000,()=>{
    console.log('your app is runing on port 5000');
})