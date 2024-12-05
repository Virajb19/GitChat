'use client'

import { useRouter } from 'nextjs-toploader/app'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema } from '~/lib/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { DemarcationLine, OAuthButton } from './social-auth'
import PasswordInput from './PasswordInput'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

type SignInData = z.infer<typeof SignInSchema>

export default function SignIn() {

  const router = useRouter()

  const form = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: ''}
  })

  async function onSubmit(data: SignInData) {
    const res = await signIn('credentials',{email: data.email, password: data.password, redirect: false})
    console.log(res)
    if(res?.ok) toast.success('Login successfull!. Welcome back!')
  }

  return <div className="w-full min-h-screen flex-center text-lg">

    <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{duration: 0.5, ease: 'easeInOut', type: 'spring', damping: '10'}} 
    className='w-[90%] sm:w-1/3 max-w-3xl'>
              <Card className='shadow-lg shadow-blue-700'>
                <CardHeader className='text-center'>
                   <CardTitle className='text-4xl'>Welcome Back</CardTitle>
                   <CardDescription>Please enter your details to signin</CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...form}>
                        <form className='space-y-3 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                           
                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                             <FormItem className='flex flex-col gap-1'>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <input className='input-style' placeholder='name@gmail.com' {...field}/>
                              </FormControl>
                              <FormMessage />
                             </FormItem>
                          )}
                        />

                       <FormField
                          control={form.control}
                          name='password'
                          render={({ field }) => (
                             <FormItem className='flex flex-col gap-1'>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <PasswordInput placeholder='password' field={field}/>
                              </FormControl>
                              <FormMessage />
                             </FormItem>
                          )}
                        />

                        <motion.button whileHover={form.formState.isSubmitting ? {} : {scale: 1.05}} whileTap={form.formState.isSubmitting ? {} : {scale: 0.9}}
                          className={twMerge('mx-auto rounded-full font-semibold cursor-pointer flex items-center gap-2 w-fit px-4 py-1 text-lg bg-black text-white dark:bg-white dark:text-black ', 
                          form.formState.isSubmitting && 'opacity-75 cursor-not-allowed')} 
                          disabled={form.formState.isSubmitting} type='submit'> 
                         {form.formState.isSubmitting && <Loader2 className='animate-spin'/>} {form.formState.isSubmitting ? 'Please wait...' : 'Login'}
                        </motion.button>

                        <DemarcationLine />
                        <div className='flex mb:flex-col items-center gap-1'>
                        <OAuthButton label='Sign in with Github' provider='github'/>
                        <OAuthButton label='Sign in with Google' provider='google'/>
                          </div>

                        </form>
                     </Form>

                     <div className="flex items-center justify-center mt-6 text-sm sm:text-lg">
                        <span className="text-muted-foreground">
                          Don&apos;t have an account yet?{' '}
                          <Link
                            href={'/signup'}
                            className="text-muted-foreground font-semibold hover:underline"
                          >
                            Sign Up
                          </Link>
                        </span>
                      </div>
                </CardContent>
              </Card>
          </motion.div>
  </div>
} 