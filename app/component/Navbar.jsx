import React from 'react';
import Image from 'next/image';
import Logo from '@/public/assets/logo.png'
import Model from '@/public/assets/model.jpg'

const Navbar = () => {
  return (
    <>
    <nav className=' bg-white border-b px-4 sm:px-6 lg:px-12 py-8 shadow-md'>
 <div className=" navbarFlex flex justify-between items-center ">
    {/* WHATBYTES LOGO */}
    <div className="flex items-center">
        <Image src={Logo}
        alt='WhatBytes Logo'
        width={50}
        height={30}
        className='mr-2'/>
        <span className='text-lg lg:text-3xl font-bold '>WhatBytes</span>
    </div>

    {/* profile section */}
    <div className="hidden sm:flex items-center space-x-2 border-2 px-2 py-1 rounded-md ">
        <Image
        src={Model}
        alt='User Img'
        width={42}
        height={32}
        className=' rounded-full w-8 h-8 object-cover'
        />
        <span className='hidden sm:block font-medium'>Rahil Siddique</span>
    </div>
 </div>
    </nav>
      
    </>
  );
}

export default Navbar;
