const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    designation:{
        type:String,
    }
    })

const user=mongoose.model("User",UserSchema);

module.exports=user;