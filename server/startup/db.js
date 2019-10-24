const mongoose=require('mongoose');
module.exports=function(){
    mongoose.connect('mongodb://localhost/local',{useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log(err))
}

