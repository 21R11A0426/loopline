import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { login } from '../lib/api';
import { Link } from 'react-router';
import {SwitchCamera,LockKeyholeOpen} from "lucide-react";

const Login = () => {
  const [loginData,setLoginData]=useState({
    email:"",
    password:"",
  })
  const queryClient=useQueryClient();
  const {mutate,isPending,error}=useMutation({
    mutationFn:login,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["authUser"]})
    }
  })
  const getLoggedIn=(e)=>{
    e.preventDefault();
    mutate(loginData);

  }
  return (
  <div className="min-h-screen grid place-items-center px-4 sm:px-6 md:px-8 py-12 sm:py-16" data-theme="dark">
    <div className="border border-primary/25 flex flex-col lg:flex-row w-7/12 max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden max-h-[100vh]">
    {/* left-side */}
    <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
    <div className="mb-4 flex items-center justify-start gap-2">
      <SwitchCamera className="size-9 text-primary"  />
      <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider"> 
        LoopLine
      </span>

    </div>
    <div className='w-full'>
      <form  onSubmit={getLoggedIn}>
       <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>
        </div>

        {error &&(
          <div className="alert alert-error mt-3 mb-4">
           <span>{error.response.data.message}</span>
          </div>
        )}
       
         
            
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Email:</span>
            </label>
            <input type="email" placeholder='Johndoe@gmail.com' className='input w-full input-bordered' value={loginData.email} 
             onChange={(e)=>setLoginData({...loginData,email:e.target.value})
            } required></input>
         
        </div>

        
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Password:</span>
            </label>
            <input type="password" placeholder='*******' className='input w-full input-bordered' value={loginData.password} 
             onChange={(e)=>setLoginData({...loginData,password:e.target.value})
            } required></input>
        
        </div>
 
          <button className='btn btn-primary w-full mt-5'>
            
            {isPending?(
              <>
              <span className='loading loading-spinner loading-xs'></span>loading</>
              
            ):(   <>
        {/* Default state: icon and "Submit" text */}
        <LockKeyholeOpen className="size-4 " />
        Login
      </>)}
          </button>
           <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create Account
                    </Link>
                  </p>
                </div>
      </form>
    </div>

    </div>
    {/* right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
      
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/1.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
    </div>
  </div>
    
  )
}

export default Login
