import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const userModel = new mongoose.model("users",userSchema);
export default userModel;