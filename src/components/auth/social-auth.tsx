'use client'

import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { FaGithub} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

export const DemarcationLine = () => (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-300" />
      <span className="px-4 text-sm text-gray-500">or continue with</span>
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  )

export function OAuthButton({label, provider}: {label: string, provider: string}) {
    const [loading,setLoading] = useState(false)
    
  return (
    <motion.button
      onClick={() => {
        try {
          setLoading(true)
          signIn(provider, { callbackUrl: "/" });
          toast.success("Signed in successfully");
        } catch (error) {
          toast.error("Something went wrong !!!");
          setLoading(false)
        }
      }}
      disabled={loading}
      className={"flex-center gap-4 w-full sm:w-fit mx-auto rounded-xl px-4 py-2 mb-2 text-base border border-blue-900 hover:bg-blue-600 dark:hover:bg-[#1e3a8a] hover:text-white hover:border-transparent duration-300 disabled:cursor-not-allowed disabled:opacity-60"}
    >
       {label}
       {provider === 'github' ? <FaGithub className='size-8'/> : <FcGoogle className='size-8'/>}

    </motion.button>
  )
}
  