"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link' // Correct import for Link
import { usePathname } from 'next/navigation' // Importing usePathname to get current path
import { sidebarLinks } from '..'

interface MobileNavProps {
  user: any // Define type for `user` based on usage or replace `any` with appropriate type
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathName = usePathname(); // Get the current path

  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer" // Fixed typo in "cursor"
          />
        </SheetTrigger>
        
        <SheetContent side="left" className='border-none bg-white'>
          {/* Home Link */}
          <Link href="/" className="cursor-pointer flex">
            <div className="flex items-center gap-1 px-4">
              <Image 
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Logo"
              />
              <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </div>
          </Link>

          {/* Sidebar Links */}
          <div className="mobilenav-sheet">
            <div className='flex h-full flex-col gap-6 pt-16 text-white'>
              {sidebarLinks.map((item) => {
                const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);
                
                return (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.route}
                      className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                    >
                      
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20} // Ensures Image component fills its parent
                          className={cn({
                            'brightness-[3] invert-0': isActive
                          })}
                        />
                      
                      <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>
                        {item.label}
                      </p>
                    </Link>
                    
                  </SheetClose>
            
                )
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
