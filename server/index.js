const express=require('express');
const app= express();

app.get('/',(req,res)=>{
    res.send({
        result:[
            {
                name:'1',
                cat:'nc'
            },
            {
                name:'2',
                cat:'nc'
            },
            {
                name:'3',
                cat:'c'   
            }
        ]        
    })
})


app.listen(1000,()=>{
    console.log('Connected')
})