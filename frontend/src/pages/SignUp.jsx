import React, { useState } from 'react'
import { Link } from 'react-router';
import {SwitchCamera} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query"

import { signup } from '../lib/api.js';
const SignUp = () => {
      const [signupData,setSignupData]=useState({
      email:"",
      fullName:"",
      password:"",
    })
    const queryClient=useQueryClient()
    const {mutate,isPending,error}=useMutation({
      mutationFn:signup,
      onSuccess:()=>{queryClient.invalidateQueries({queryKey:["authUser"]})}
    })
    const getSigned=(e)=>{
      e.preventDefault();
      mutate(signupData);
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
      <form  onSubmit={getSigned}>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Create an Account</h2>
          <p className='text-sm opacity-70'>
            Join loopline and start your language learning adventure!
          </p>

        </div>

        {error &&(
          <div className="alert alert-error mb-4">
           <span>{error.response.data.message}</span>
          </div>
        )}
       
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Full Name:</span>
            </label>
            <input type="text" placeholder='John Doe' className='input w-full input-bordered' value={signupData.fullName} 
             onChange={(e)=>setSignupData({...signupData,fullName:e.target.value})
            } required></input>
        
        </div>
            
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Email:</span>
            </label>
            <input type="email" placeholder='Johndoe@gmail.com' className='input w-full input-bordered' value={signupData.email} 
             onChange={(e)=>setSignupData({...signupData,email:e.target.value})
            } required></input>
         
        </div>

        
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Password:</span>
            </label>
            <input type="password" placeholder='*******' className='input w-full input-bordered' value={signupData.password} 
             onChange={(e)=>setSignupData({...signupData,password:e.target.value})
            } required></input>
           <p className="text-xs opacity-70 mt-1">
              Password must be at least 6 characters long
          </p>
        </div>
         <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
          <button className='btn btn-primary w-full'>
            
            {isPending?(
              <>
              <span className='loading loading-spinner loading-xs'></span>loading</>
              
            ):("Create Account")}
          </button>
           <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
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

export default SignUp
