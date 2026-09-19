'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils'
import CustomInput from './CustomInput'

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof authFormSchema>) {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Changed 'username' to 'email' to match the schema */}
              <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
              <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />

              <Button type="submit" className="form-btn w-full">
                {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default AuthForm