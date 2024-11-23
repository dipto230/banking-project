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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

// Dynamic Validation Schema
const authFormSchema = (type: 'sign-in' | 'sign-up') => {
  const baseSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });

  if (type === 'sign-up') {
    return baseSchema.extend({
      firstName: z.string().min(3, 'First name must be at least 3 characters'),
      lastName: z.string().min(3, 'Last name must be at least 3 characters'),
      address: z.string().min(10, 'Address must be at least 10 characters'),
      state: z.string().min(5, 'State must be at least 5 characters'),
      postalCode: z.string().min(6, 'Postal code must be at least 6 characters'),
      dateOfBirth: z.string().min(10, 'Date of Birth must be valid (YYYY-MM-DD)'),
      ssn: z.string().min(3, 'SSN must be at least 3 characters'),
    });
  }

  return baseSchema;
};

// Custom Input Component
const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: {
  control: any;
  name: string;
  label: string;
  placeholder: string;
}) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Input {...field} placeholder={placeholder} />
        <FormMessage />
      </FormItem>
    )}
  />
);

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'sign-up' && {
        firstName: '',
        lastName: '',
        address: '',
        state: '',
        postalCode: '',
        dateOfBirth: '',
        ssn: '',
      }),
    },
  });

  // Form Submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Submitted Values:', values);
    setIsLoading(true);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form Submitted Successfully');
    } catch (error) {
      console.error('Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Conditional Inputs for Sign-Up */}
          {type === 'sign-up' && (
            <>
             <div className='flex gap-4'>
             <CustomInput
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
              />
              <CustomInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
             </div>
              <CustomInput
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter your address"
              />
              <div className='flex gap-4'>
              <CustomInput
                control={form.control}
                name="state"
                label="State"
                placeholder="Enter your state"
              />
              <CustomInput
                control={form.control}
                name="postalCode"
                label="Postal Code"
                placeholder="Enter your postal code"
              />
              </div>
             <div className='flex gap-4'>
             <CustomInput
                control={form.control}
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
              />
              <CustomInput
                control={form.control}
                name="ssn"
                label="SSN"
                placeholder="Example: 12345"
              />
             </div>
            </>
          )}

          {/* Email Input */}
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          {/* Password Input */}
          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          {/* Submit Button */}
          <Button className="form-btn" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : type === 'sign-in' ? (
              'Sign In'
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === 'sign-in'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </p>
        <Link
          href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
          className="form-link"
        >
          {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
