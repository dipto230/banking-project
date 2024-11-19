'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';


// Form validation schema


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading , setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log("Submitted Values:", values);
    setIsLoading(true)
    consolelog(vlues)
    setIsLoading(flase);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex">
          <div className="flex items-center gap-1">
            <Image src="/icons/logo.svg" width={34} height={34} alt="Logo" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link Account"
              : type === "sign-in"
              ? "Sign In"
              : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <p>Welcome back! Please link your account.</p>
          <Button onClick={() => console.log("Link Account")}>
            Link Account
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         

           <CustomInput
            control={form.control} name='email' label="email" placeholder="enter your email"
           />
            <CustomInput
            control={form.control} name='password' label="password" placeholder="enter your password"
           />
       
      
            {/* Submit Button */}
            <Button className='form-btn'  type="submit"  disabled={ isLoading}>
              {isLoading?(
                <>
                <Loader2 size={20} className='animate-spin'/>; &nbsp;
                Loading...
                
                </>
              ): type==='sign-in'?
            'sign-in': 'sign up'}
            </Button>
          </form>
        </Form>
      )}
    </section>
  );
};

export default AuthForm;
