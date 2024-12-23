import mongoose, { mongo, Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const accountSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //To refer to User schema, foreign key
        ref:'User',
        required:true
    },
    balance : {
        type:Number,
        required:true
    }
})

export const Account = mongoose.model('accounts', accountSchema)
export const User = mongoose.model('users', userSchema)

