const mongoose = require('mongoose');

// creating schema for User
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        default:"User123",
        trim:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        lowercase:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    age:{
        type:Number,
        
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        default:"male",

    },
    height:{
        type:Number,
        min:100,
        max:300,
        default:0,

    },
    weight:{
        type:Number,
        min:40,
        max:200,
        default:0,
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    updated_at:{
        type:Date,
        default:Date.now,
    }


})

const User = mongoose.model('users',userSchema);
export default User;