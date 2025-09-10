import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getstreamToken } from '../lib/api';
import useAuthUser from '../hooks/useAuthUser';
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader';
const stream_api_key=import.meta.env.VITE_STREAM_API_KEY;
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
const CallPage = () => {
  const {id:callId}=useParams();
  const [client,setClient]=useState(null);
  const [call,setCall]=useState(null);
  const[isconnecting,setIsConnecting]=useState(true);
  const {authUser,isloading}=useAuthUser()

  const {data:tokenData}=useQuery({
    queryKey:["streamtoken"],
    queryFn:getstreamToken,
    enabled:!!authUser
  })
  console.log(tokenData);
  useEffect(()=>{
    const init=async()=>{
      if(!callId || !tokenData.token || !authUser )
        return
      try{
        console.log("intialising streamchat Video Call")
        const user={
          id:authUser._id,
          name:authUser.fullName,
          image:authUser.profilePic
        }
        const client = new StreamVideoClient({ apiKey:stream_api_key, user,token:tokenData.token });
        const callinstance = client.call("default", callId);
        await callinstance.join({create:true});
        console.log("Joined call successfully");
        setClient(client);
        setCall(callinstance)
      }
      catch(error){
        console.log("error in starting video call",error);
        toast.error("Could not join the call. Please try again.");
      }
      finally{
        setIsConnecting(false);
      }
    }
    init();
  },[callId,authUser,tokenData])

    if(isconnecting || isloading){
      return <PageLoader/>
    }

  return (
    <div>
         <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};
export default CallPage
