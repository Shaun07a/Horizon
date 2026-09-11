'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

const AuthForm = ({ type}: {type: string }) => {
  const [user, setUser] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='cursor-pointer flex items-center gap-1'>
                  <Image 
                      src="/icons/logo.svg" 
                      width={34}
                      height={34}
                      alt = "Horizon logo"
                      
                  />
                  <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
              </Link>

              <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                     ? 'Link Account'
                     : type === 'sign-in'
                       ? 'Sign In'
                       : 'Sign Up'
                    }

                    <p className='text-16 font-normal text-gray-600'>
                        {user
                          ? 'Link your account to get started'
                          : 'Please enter your details'
                        }
                    </p>
                </h1>
              </div>
        </header>
        {user ? (
          <div className='flex flex-col gap-4'>
                {/* PlaidLink */}
          </div>
        ): (
            <>
              FORM
            </>
        )}
    </section>
  )
}

export default AuthForm