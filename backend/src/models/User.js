import mongoose from "mongoose"
import bcrypt from "bcryptjs";
const Schema=mongoose.Schema;

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    friend:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    bio:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:""
    },
    nativeLanguage:{
        type:String,
        default:""
    },
    learningLanguage:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""

    },
    isUpdated:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt =  bcrypt.genSaltSync(10);
        this.password=await bcrypt.hash(this.password,salt);
        return next()
    }
    catch(error){
        return next(error);
    }
});
userSchema.methods.matchedPassword=async function(userPassword){
 const isPassword=await bcrypt.compare(userPassword,this.password);
 return isPassword;
}
const User=mongoose.model("User",userSchema);
export default User;