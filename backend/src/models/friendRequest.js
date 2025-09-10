import mongoose from "mongoose";
const Schema=mongoose.Schema;

const friendRequestSchema=new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipent:{
        type:Schema.Types.ObjectId,
        ref:"User",

        required:true
    },
    status:{
        type:String,
        enum:["accepeted","pending"],
        default:"pending"
    }
},{timestamps:true});

const friendRequest=mongoose.model("friendRequest",friendRequestSchema);
export default friendRequest;