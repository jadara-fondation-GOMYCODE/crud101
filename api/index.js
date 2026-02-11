const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    const newUser = {
        id : database.length ,
        username: 'hada 3ndo id' ,
        password :'xxxxxxxxxxxx' 
    }
    database.push(newUser)
    res.json(database)
})



app.listen(5000,()=>{
    console.log('your app is runing on port 5000');
})