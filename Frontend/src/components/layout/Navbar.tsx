import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {  Home, BaggageClaim, User, Contact } from "lucide-react";
import { Button } from '../lightswind/button';
import HamburgerMenuOverlay from '../lightswind/hamburger-menu-overlay';

const Navbar: React.FC = () => {
  type NavItemsType = {
    name: string
    slug: string
    isActive: boolean
  }
  const navigate = useNavigate()
  const navItems: NavItemsType[] = [
    {
      name: "Home",
      slug: "/",
      isActive: true
    },
    {
      name: "Products",
      slug: "/products",
      isActive: true
    },
    {
      name: "About",
      slug: "/about",
      isActive: true
    },
    {
      name: "Contact",
      slug: "/contact",
      isActive: true
    },
   
    
  ]
  const menuItems = [
  { label: "Home", icon: <Home size={20} />, href: "/" },
  { label: "Products", icon: <BaggageClaim size={20} />, href: "/search" },
  { label: "About", icon: <User size={20} />, onClick: () => console.log("Profile") },
  { label: "Contact", icon: <Contact size={20} />, href: "/settings" }
];
  return (
    <>
    <nav className='hidden md:flex justify-between px-4 items-center bg-white border-b border-gray-200 h-16  '>
      <div className='gap-10 flex items-center justify-center '>
        <Link to="/" className='flex items-center justify-center '>
          <img src="./byteBazaar.png" alt="logo"
            className='w-24 h-24 cursor-pointer' />

        </Link>
      </div>

      <ul>
        {navItems.map((item, index) => (
          <li key={index} className='inline-block mx-2'>
            <Button variant='ghost'
              className='cursor-pointer hover:bg-gray-100 '
              onClick={() => {navigate(item.slug) }}>
              {item.name}
            </Button>
          </li>
        ))}
       <li className='inline-block'>
         <Button 
        variant='github'
        className='cursor-pointer'>
          Login
        </Button>
        
       </li>
       <li className='inline-block mx-4'>
        <Button className='cursor-pointer'>
          Sign Up
        </Button>
       </li>
      </ul>
    </nav>

    <HamburgerMenuOverlay 
    items={menuItems}
    className='md:hidden'  />
    </>

  )
}

export default Navbar
