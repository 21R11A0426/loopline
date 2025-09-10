import { StreamChat } from "stream-chat";
import "dotenv/config"
const api_key=process.env.STREAM_API_KEY;
const api_secret=process.env.STREAM_API_SECRET;
if(!api_key || !api_secret){
    console.log("stream api key or stream secret is missing");
}
const chatClient = StreamChat.getInstance(api_key,api_secret);

export const upstreamUser=async(userData)=>{
    try{
 
    await chatClient.upsertUsers([userData]);
    return userData;
    }
    catch(error){
        console.log(`something wrong occured ${error} during upserting`);
    }

}

export const generateStreamToken=(userId)=>{
    try{
    const userStr=userId.toString();

    return chatClient.createToken(userStr);
    }
    catch(error){
        console.log(`something wrong occured ${error} during generating token`);
    }

}