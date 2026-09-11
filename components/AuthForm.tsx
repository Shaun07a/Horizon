'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1. Updated Schema to match the image exactly
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)

  // 2. Updated useForm to expect the username schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer flex items-center gap-1'>
          <Image 
            src="/icons/logo.svg" 
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className='text-[26px] font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
          {/* 3. Fixed HTML nesting: Separated the h1 and p tags */}
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }
          </h1>
          <p className='text-16 font-normal text-gray-600'>
            {user
              ? 'Link your account to get started'
              : 'Please enter your details'
            }
          </p>
        </div>
      </header>
      
      {user ? (
        <div className='flex flex-col gap-4'>
          {/* PlaidLink */}
        </div>
      ) : (
        <>
          <Form {...form}>
            {/* Added space-y-8 to give the form items some breathing room */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* 4. Built the form structure matching the picture */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default AuthForm