import React from 'react'
import { authuser } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
  const authUser=useQuery({ queryKey: ['authUser'], queryFn: 
 authuser,
 retry:false
  });
  return {isloading:authUser.isLoading,authUser:authUser.data?.user};

}

export default useAuthUser
