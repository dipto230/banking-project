import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {Control } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
interface CustomInput{
    control: Control<z.infer<typeof formSchema>>,
    name: 'email'| 'password',
    label: string,
    placeholder : string    

}
const formSchema = authFormSchema('sign-up')


const CustomInput = ({control , name, label, placeholder}: CustomInput) => {
  return (
            <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='form-label'>{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={name==='password'?'password':'text'}
                      placeholder={placeholder}
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  )
}

export default CustomInput