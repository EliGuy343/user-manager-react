import mongoose from "mongoose";
const {schema} = mongoose;

const UserSchema = new mongoose.Schema({
 fullName: {
    type:String,
    required:true,
 },
 id: {
    type:String,
    required:true,
    unique:true
 },
 phoneNumber:{
    type:String,
    required: true
 },
 ip:{
    type:String,
    required: true
 }
}, {timestamps:true});

export default mongoose.model("User", UserSchema);