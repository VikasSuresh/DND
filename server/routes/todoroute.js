const express= require('express');
const router=express.Router();
const {Todo}=require('../model/todomodel')
router.get('/',(req,res)=>{
    Todo.find()
        .then(result=>{
            res.send({result});
        })    
})

router.post('/add',(req,res)=>{    
    const todo = new Todo({
        name:req.body.name,
        cat:false
    })
    todo.save()
        .then(todo=>res.send({todo}))    
})

router.put('/edit',(req,res)=>{
    Todo.findById(req.body.id)
        .then(data=>{            
            data.cat=req.body.cat
            data.save()
        })
        .catch(err=>res.send(err))
})

router.delete('/del',(req,res)=>{
    Todo.deleteOne({_id:req.body.id})
        .catch(err=>res.send(err))
})

module.exports =router;