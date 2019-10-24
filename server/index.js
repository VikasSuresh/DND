const express=require('express');
const cors=require('cors');
const app= express();
const todoroute =require('./routes/todoroute')


app.use(cors())
app.use(express.json())
require('./startup/db')();
app.use('/',todoroute)


app.listen(1000,()=>{
    console.log('Connected to Port')
})