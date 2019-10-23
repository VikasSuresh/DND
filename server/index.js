const express=require('express');
const cors=require('cors');
const app= express();
app.use(cors())

app.get('/',(req,res)=>{
    res.send({
        result:[
            {
                id:Math.random(),
                name:'1',
                cat:'nc'
            },
            {
                id:Math.random(),
                name:'2',
                cat:'nc'
            },
            {
                id:Math.random(),
                name:'3',
                cat:'c'   
            }
        ]        
    })
})


app.listen(1000,()=>{
    console.log('Connected')
})