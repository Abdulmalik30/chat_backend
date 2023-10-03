import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    username:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:null
    },
    messages:[messageSchema]
})

const messageSchema = new Schema({
    content:{
       type:String,
       required:true 
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const User = mongoose.model('User',userSchema)
const Message = mongoose.model('Message',userSchema)

export {User, Message}
