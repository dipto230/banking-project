"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Sidebar = ({ user }) => {
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className="mb-12 cursor-pointer">
                <div className="flex items-center gap-2">
                    <Image 
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Logo"
                        className="w-6 h-6"
                    />
                    <h1 className='sidebar-logo'>Horizon</h1>
                </div>
            </Link>
          
        </nav>
    </section>
  );
};

export default Sidebar;
