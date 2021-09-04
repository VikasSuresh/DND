const mongoose= require('mongoose');

const todo =new mongoose.Schema({
    id:String,
    name:String,
    cat:Boolean
})

const Todo =mongoose.model('todo',todo)

exports.Todo=Todo;