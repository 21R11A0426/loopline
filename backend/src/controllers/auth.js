import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { upstreamUser } from "../lib/stream.js";
export const signup=async(req,res)=>{
  const {email,fullName,password}=req.body;
  try{
    if(!email || !fullName || !password){
        return res.status(400).json({message:"all fields required"});
    }
    if(password.length<6){
        return res.status(400).json({message:"password must be of 6 characters"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"email already exits"});
    }
    const random=Math.floor(Math.random()*100)+1;
    const randomUrl=`https://avatar.iran.liara.run/public/${random}.png`
    const newUser=new User({
        email,
        fullName,
        password,
        profilePic:randomUrl
    });
    await newUser.save();
    try{
        await upstreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic || ""
        })
        console.log(`Stream user created for ${newUser.fullName}`);
    }
    catch(error){
        console.log("error occured in stream user",error);
    }
    const token=jwt.sign({userId:newUser._id},process.env.SECRET_KEY,{
        expiresIn:"7d"
    });
    
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, 
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({success:true,user:newUser});
  }
  catch(error){
    console.log(`error in signup ${error}`);
    res.status(500).json({message:"error in signup"});
  }
}


export const login=async(req,res)=>{
    try{
   let {email,password}=req.body;
   if(!email || !password){
    return res.status(400).json({message:"all fields are required"});
   };
   const user=await User.findOne({email});
   if(!user){
    return res.status(401).json({message:"invalid email or password"});

   };
   const isPassword=await user.matchedPassword(password);
   if(!isPassword){
    return res.status(401).json({message:"invalid email or password"});
   }
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{
        expiresIn:"7d"
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, 
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({success:true,user:user});
}
catch(error){
    console.log("something went wrong",error);
    res.status(500).json({message:"error in login"});
}
}


export const logout=async(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({message:"user successfully loggedout"});
}

export const onboarding=async(req,res)=>{
    try{
    const userId=req.user._id;
    let {fullName,location,bio,learningLanguage,nativeLanguage}=req.body;
    if(!fullName|| !location || !bio || !learningLanguage || !nativeLanguage){
        return res.status(400).json({message:"All fields are  required",missingFields:[
            !fullName && "fullName",!bio && "bio",!location && "location",!nativeLanguage && "nativeLanguage",!learningLanguage && "learningLanguage"
        ].filter(Boolean)})
    }
    const updatedUser=await User.findByIdAndUpdate(userId,{
        ...req.body,isUpdated:true
    },{new:true});
    if(!updatedUser){
       return res.status(404).json({message:"user not found"});
    }
    try{
        await upstreamUser({
            id:updatedUser._id.toString(),
            name:updatedUser.fullName,
            image:updatedUser.profilePic || ""
        });
        console.log("stream info updated for user",updatedUser.fullName);
    }
    catch(Streamerror){
        console.log("error ocurred in chnaging stream info",Streamerror)
    }
    res.status(200).json({success:true,user:updatedUser});
}
    catch(error){
        console.log("error during onboarding",error);
        res.status(500).json({message:"internal service errror"})
    }

}