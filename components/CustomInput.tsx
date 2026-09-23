import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form' // Added FormItem
import { Input } from './ui/input'

import { Control, FieldPath } from 'react-hook-form' // Added FieldPath
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up');

// Fixed the typing so 'name' strictly matches the keys in your schema
interface CustomInput {
 control: Control<z.infer<typeof formSchema>>,
 name: FieldPath<z.infer<typeof formSchema>>,
 label: string,
 placeholder: string
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        // Replaced the <div> with <FormItem>
        <FormItem className="form-item">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input 
                placeholder={placeholder}
                className="input-class"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </FormItem>
      )}
    />
  )
}

export default CustomInput