import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Login from "./pages/Login.jsx"
import { Routes, Route ,Navigate} from "react-router"; 
import HomePage from "./pages/HomePage.jsx";
import CallPage from "./pages/Call.jsx";
import ChatPage from "./pages/Chat.jsx";
import Notifications from "./pages/Notifications.jsx";
import SignUp from "./pages/SignUp.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import { axiosInstance } from './lib/axios.js';
import PageLoader from './components/PageLoader.jsx';
import { authuser } from './lib/api.js';
import useAuthUser from './hooks/useAuthUser.js';
import toast,{Toaster} from 'react-hot-toast';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/themeSelect.js';
const App = () => {

 const {isloading,authUser}=useAuthUser();
 const {theme,setTheme}=useThemeStore();
 const isAuthenticated=Boolean(authUser);

 const isUpdated=authUser?.isUpdated;

  if(isloading){
    return (
      <PageLoader></PageLoader>
    )
  }
  return (
    <div className=' h-screen text'data-theme={theme}>
   
      <Routes>
      <Route path="/login" element={!isAuthenticated?<Login />:<Navigate to={!isUpdated?"/onboarding":"/"}/>} />
       <Route path="/" element={isAuthenticated && isUpdated ?<Layout showSideBar={true}><HomePage/></Layout>: 
       <Navigate to={!isAuthenticated?"/login":"/onboarding"}/>}/>
       <Route path="/call/:id" element={isAuthenticated && isUpdated ?<CallPage/>: 
       <Navigate to={!isAuthenticated?"/login":"/onboarding"}/>} />
       <Route path="/chat/:id" element={isAuthenticated && isUpdated ?<Layout showSideBar={false}><ChatPage/></Layout>: 
       <Navigate to={!isAuthenticated?"/login":"/onboarding"}/>} />
       <Route path="/notifications" element={isAuthenticated && isUpdated?<Layout showSideBar={true}><Notifications/></Layout>:<Navigate to={!isAuthenticated?"/login":"/onboarding"}/>} />
       <Route path="/onboarding" element={isAuthenticated?   !isUpdated ? (
                <Onboarding />
              ) : (
                <Navigate to="/" />
              ):<Navigate to="/login"/>} />
       <Route path="/signup" element={!isAuthenticated?< SignUp/>:<Navigate to="/"/>} />
    </Routes>
        <Toaster />
    </div>

  )
}

export default App

