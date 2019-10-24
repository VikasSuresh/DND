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
                cat:false
            },
            {
                id:Math.random(),
                name:'2',
                cat:false
            },
            {
                id:Math.random(),
                name:'3',
                cat:true   
            }
        ]        
    })
})


app.listen(1000,()=>{
    console.log('Connected')
})