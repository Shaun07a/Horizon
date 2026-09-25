'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"

const MobileNav = ({user}: MobileNavProps) => {
  const pathname = usePathname();
  
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white animate-in slide-in-from-left duration-300 ease-in-out">
              <Link href="/" className='cursor-pointer flex items-center gap-1 px-4'>
                  <Image 
                      src="/icons/logo.svg" 
                      width={34}
                      height={34}
                      alt="Horizon logo"
                  />
                  <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
              </Link>
              
              <div className="mobilenav-sheet">
                  {/* @ts-ignore */}
                  <SheetClose asChild>
                      <nav className="flex h-full flex-col gap-6 pt-6 text-white px-4">
                            {sidebarLinks.map((item) => {
                            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                            return (
                              <SheetClose asChild key={item.route}>
                                  <Link href={item.route}
                                key={item.label}
                                className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient': isActive})}
                                >
                                        <Image 
                                            src={item.imgURL}
                                            alt={item.label}
                                            width={20}
                                            height={20}
                                            className={cn({
                                            'brightness-[3] invert-0': isActive
                                            })}
                                        />
                                    
                                    <p className={cn
                                        ('text-16 font-semibold text-black-2',{
                                            'text-white' : isActive
                                        })}>
                                        {item.label}
                                    </p>
                                </Link>
                              </SheetClose>
                            )
                        })}

                      USER
                      </nav>
                  </SheetClose>

                  {/* Wrapped the Footer in a div with px-4 to match the nav links */}
                  <div className="px-4">
                    <Footer user={user} type="mobile" />
                  </div>
              </div>
         
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav