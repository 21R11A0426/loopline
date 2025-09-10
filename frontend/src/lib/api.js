import { axiosInstance } from "./axios.js";


export const signup=async(signUpData)=>{
    const result=await axiosInstance.post("/auth/signup",signUpData);
    return result.data;
}
export const login=async(loginData)=>{
    const result=await axiosInstance.post("/auth/login",loginData);
    return result.data;
}
export const logout=async(loginData)=>{
    const result=await axiosInstance.post("/auth/logout");
    return result.data;
}
export const authuser=async()=>{
    try{
      const res=await axiosInstance.get("/auth/me");
    
      return res.data;
    }
    catch(error){
        console.log("error occured in logout",error);
        return null;
    }

}
export const onboarding=async(formData)=>{
     const result=await axiosInstance.post("/auth/onboarding",formData);
    return result.data;
}
export const getUserFriends=async()=>{
     const result=await axiosInstance.get("/user/friends");
    return result.data;
}
export const getUsers=async()=>{
     const result=await axiosInstance.get("/user");
    return result.data;
}
export const getOutGoingRequests=async()=>{
     const result=await axiosInstance.get("/user/outgoingFriendRequests");
    return result.data;
}

export const sendrequests=async(userId)=>{
    const result=await axiosInstance.post(`/user/friendrequest/${userId}`);
    return result.data;
}

export const getFriendRequests=async()=>{
     const result=await axiosInstance.get("/user/friendrequests");
    return result.data;
}

export const acceptRequest=async(requestId)=>{
    const result=await axiosInstance.put(`/user/friendrequest/${requestId}/accept`);
    return result.data;
}

export const getstreamToken=async()=>{
      const result=await axiosInstance.get(`/chat/token`);
    return result.data;
}