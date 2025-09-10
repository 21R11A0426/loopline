import React, { useState ,useEffect} from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { onboarding } from '../lib/api';
import {CameraIcon,ShuffleIcon,MapPinIcon, SwitchCamera, ShipWheelIcon } from "lucide-react";
import { LANGUAGES } from '../constants';

const Onboarding = () => {

  const {authUser}=useAuthUser();
  const [formData,setFormData]=useState({
         fullName:authUser?.fullName || "",
    bio:authUser?.bio || "",
    profilePic:authUser?.profilePic || "",
    location:authUser?.location || "",
    nativeLanguage:authUser?.nativeLanguage || "",
    learningLanguage:authUser?.learningLanguage || "",
  })

  const queryClient=useQueryClient();
  const {mutate,isPending,error}=useMutation({
    mutationFn:onboarding,
    onSuccess:()=>{
      
      toast.success("profile onboarded succesfully");
      queryClient.invalidateQueries({queryKey:["authUser"]})

},

    onError:(error)=>{
      console.log(error);
      toast.error(error.response.data.message);

    }
  
  }
 
  )
  const changeAvater=()=>{
    const random=Math.floor(Math.random()*100)+1;
    const randomUrl=`https://avatar.iran.liara.run/public/${random}.png`;
    setFormData({...formData,profilePic:randomUrl});
  }
  const getonboarded=(e)=>{
    e.preventDefault();
    mutate(formData);
  }

return (
  <div className="min-h-screen bg-base-100 grid place-items-center py-12 px-4">
    <div className="card bg-base-200 w-6/12 max-w-3xl shadow-xl"> {/* Optional: max-w-lg is a bit tighter */}
      <div className='card-body'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
        
        <form onSubmit={getonboarded} className='space-y-4'> {/* Reduced spacing slightly */}
          {/* PROFILE PIC CONTAINER - NOW SELF-CONTAINED */}
          <div className='flex flex-col items-center justify-center space-y-4'>
            {/* IMAGE PREVIEW - SMALLER SIZE */}
            <div className='size-24 rounded-full bg-base-300 overflow-hidden'>
              {formData.profilePic ? (
                <img src={formData.profilePic} alt="profilepic preview" className='w-full h-full object-cover'/>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                </div>
              )}
            </div>
            
            <div className='flex items-center gap-2'>
              {/* BUTTON TEXT AND FUNCTION MATCHED TO GOAL */}
              <button type="button" onClick={changeAvater} className='btn btn-accent btn-sm'>
                <ShuffleIcon className="size-4 mr-2"/>
                 Change Profilepic
              </button>
            </div>
          </div>

          {/* -- FORM FIELDS ARE NOW SIBLINGS, NOT CHILDREN -- */}

          {/* FULL NAME */}
          <div className='form-control'>
            <label className='label'><span className='label-text'>Full Name</span></label>
            <input 
              type='text'
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className='input input-bordered w-full'
              placeholder='Your full name'/>
          </div>
            
          {/* BIO - REDUCED HEIGHT */}
          <div className='form-control'>
            <label className='label'><span className='label-text'>Bio</span></label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="textarea textarea-bordered h-20" 
              placeholder="Tell others about yourself..."
            />
          </div>

          {/* LANGUAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NATIVE LANGUAGE */}
            <div className="form-control">
              <label className="label"><span className="label-text">Native Language</span></label>
              <select
                name="nativeLanguage"
                value={formData.nativeLanguage}
                onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                className="select select-bordered w-full"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>
            
            {/* LEARNING LANGUAGE */}
            <div className="form-control">
              <label className="label"><span className="label-text">Learning Language</span></label>
              <select
                name="learningLanguage"
                value={formData.learningLanguage}
                onChange={(e) => setFormData({ ...formData, learningLanguage: e.target.value })}
                className="select select-bordered w-full"
              >
                <option value="">Select language you're learning</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* LOCATION */}
          <div className="form-control">
            <label className="label"><span className="label-text">Location</span></label>
            <div className="relative">
              <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input input-bordered w-full pl-10"
                placeholder="City, Country"
              />
            </div>
          </div>

          <button className='btn btn-primary w-full' disabled={isPending} type='submit'>
            {!isPending ? (
              <><ShipWheelIcon className="size-5 mr-2" /> Complete Onboarding</>
            ) : (
              <><SwitchCamera className="animate-spin size-5 mr-2" /> Onboarding...</>
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
);
  
}

export default Onboarding
