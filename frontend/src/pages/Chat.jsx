import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { authuser, getstreamToken } from '../lib/api';
import { StreamChat } from "stream-chat";
import ChatLoader from '../components/ChatLoader';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import toast from 'react-hot-toast';
import "stream-chat-react/dist/css/v2/index.css";

import "../index.css"
import CallButton from '../components/CallButton';

const stream_api_key=import.meta.env.VITE_STREAM_API_KEY;
const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClinet,setChatClient]=useState(null);
  const [channel,setChannel]=useState(null);
  const [isLoading,setIsLoading]=useState(true);


  const {authUser}=useAuthUser();

  const {data:tokenData}=useQuery(
    {
      queryKey:["streamtoken"],
      queryFn:getstreamToken,
      enabled:!!authUser
    }
  )
 
  useEffect(()=>{
    const init=async()=>{
      if(!tokenData?.token || !authUser){
        return
      }
      try{
        console.log("intialising stream chat...");
        const client = StreamChat.getInstance(stream_api_key);
        await client.connectUser(
       {
      id: authUser._id,
      name: authUser.fullname,
      image: authUser.profilePic,
      },
        tokenData.token,
      );
      const channelId = [authUser._id, targetUserId].sort().join("-");

      const currChannel=client.channel("messaging",channelId,{
        members:[authUser._id,targetUserId]
      })

      await currChannel.watch();
      setChatClient(client);
      setChannel(currChannel);
      

      }
      catch(error){
        console.log("error occured in intialising chat",error);
        toast.error("could not connect to chat,please try again");
      }
      finally{
        setIsLoading(false)
      }
    }
    init();
  },[tokenData,authUser,targetUserId]);

  const handleVideoCall=async()=>{
      if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  }
  if(isLoading || !channel ||!chatClinet){
    return <ChatLoader/>;
  }
  return (
       <div className="h-[93vh]">
           <Chat client={chatClinet}>
        <Channel channel={channel}>
          <div className="w-full relative">
           <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
       </div>
  )
}

export default ChatPage
