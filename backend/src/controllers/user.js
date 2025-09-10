import friendRequest from "../models/friendRequest.js";
import User from "../models/User.js";
export const getrecommendedUser=async(req,res)=>{
    try{
const currentId=req.user._id;
const currentUser=req.user;

const recommendedUser=await User.find({$and:[{_id:{$ne:currentId}},{_id:{$nin:currentUser.friend}},{isUpdated:true}],});
res.status(200).json(recommendedUser);
    }
    catch(error){
        console.log("error occurrend in recommendedUser",error.message);
        res.status(400).json({message:"internal server error"});
    }
}
export const getfriendsusers=async(req,res)=>{
    try{
        const currentId=req.user._id;
        const user=await User.findById(currentId).select("friend").populate("friend","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friend);
        }
    catch(error){
        console.log("error occurrend in getfriendsusers",error.message);
        res.status(400).json({message:"internal server error"});
    }
}

export const sendFriendRequests=async(req,res)=>{
    try{
        const currId=req.user._id;
        const {id}=req.params;
        if(currId==id){
           return res.status(400).json({message:"you cannot send friend request to yourself"});

        }
        const recipent=await User.findById(id);
        if(!recipent){
            return res.status(400).json({message:"recipent does not exists"});
        }
        if(recipent.friend.includes(currId)){
            return res.status(400).json({message:"you are already friends"});``
        };

        const exists=await friendRequest.findOne({$or:[{sender:currId,recipent:id},{sender:id,recipent:currId}]});
        if(exists){
            return res.status(400).json({recipent,message:"A friend request allready exists"});
        }
        const newRequest=new friendRequest({
            sender:currId,
            recipent:id
        });
        await newRequest.save();
        res.status(200).json(newRequest);
    }
    catch(error){
         console.log("error occurrend in sendfriendrequests",error.message);
        res.status(400).json({message:"internal server error"});
    
    }
}

export const acceptRequest=async(req,res)=>{
    try{
    let {id}=req.params;
    const request=await friendRequest.findById(id);
    if(!request){
        return res.status(404).json({msg:"friend request not found"});

    }
    if(request.recipent.toString()!==req.user.id){
        return res.status(404).json({msg:"you are not authorised to accept the request"});
    }
    request.status="accepeted";
    await request.save();

    await User.findByIdAndUpdate(request.sender,{
        $addToSet:{friend:request.recipent}
    });
    await User.findByIdAndUpdate(request.recipent,{
        $addToSet:{friend:request.sender}
    })
    res.status(200).json({message:"friend request accepted"});
}
    catch(error){
        console.log("error occurrend in acceptRequest",error.message);
        res.status(400).json({message:"internal server error"});
    }
}

export const getFriendRequests=async(req,res)=>{
    try{
    const accepted=await friendRequest.find({sender:req.user.id,status:"accepeted"}).populate("recipent" ,"fullName profilePic");
    const incoming=await friendRequest.find({recipent:req.user.id,status:"pending"}).populate("sender","fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json({accepted,incoming});
    }
    catch(error){
        console.log("error occurrend in getfriendrequests",error.message);
        res.status(400).json({message:"internal server error"});
    }
}

export const outgoingFriendRequests=async(req,res)=>{
    try{
        const outgoing=await friendRequest.find({sender:req.user.id,status:"pending"}).populate("recipent","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(outgoing);
    }
    catch(error){
        console.log("error occurrend in outgoingFriendRequests",error.message);
        res.status(400).json({message:"internal server error"});
    
    }
}