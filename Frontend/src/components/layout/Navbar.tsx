import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom"
import { Search, X, Menu } from "lucide-react";

const Navbar: React.FC = () => {
  type NavItemsType = {
    name: string
    slug: string
    isActive: boolean
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
      name: "Cart",
      slug: "/cart",
      isActive: true
    }
  ]
  return (
    <nav className='backdrop-blur-lg bg-white/10 dark:bg-gray-900/60 
     h-14 fixed top-4 left-4 right-4 
     text-slate-900 flex justify-between px-4 items-center rounded-full border border-slate-600'>
      <div className='gap-10 flex items-center '>
        <Link to="/" className='flex items-center justify-center '>
          <img src="./byteBazaar.png" alt="logo"
            className='w-16 h-16 cursor-pointer' />

        </Link>
        <div className='relative'>
          <input type="text" placeholder='Samsung A07' className='sm:w-[52vw] md:w-[37vw] lg:w-[50vw] xl:w-[60vw]  hidden sm:block
        focus:outline-none bg-slate-50 px-4 py-2 rounded-md transition delay-100 focus:border border-slate-400 focus:border-slate-800' />
          <Search className='absolute right-5 top-2 hidden sm:block text-slate-700' />
        </div>
      </div>
      <ul className='md:flex hidden'>
        {navItems.map((item) => (
          <li className='group rounded-md hover:bg-purple-700 hover:shadow font-sans px-4 md:py-2
          py-1 relative font-bold transition delay-100 text-gray-800 hover:text-white
          '
          >
            <NavLink className={
              ({ isActive }) => `${isActive && "border-b-2 group-hover:border-white border-purple-950 px-2 "}`}
              to={item.slug}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className='space-x-2 md:hidden flex items-center '>
        <Link to="/cart" className=' p-2 
          relative px-4 py-2 rounded-md font-bold transition  
          hover:shadow font-sans'>
          Cart
        </Link>
        <button className=' p-2 
          relative px-4 py-2 rounded-md font-bold transition 
          '
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} className='text-slate-900 dark:text-slate-200 cursor-pointer' />
            : <Menu size={24} className='text-slate-900 dark:text-slate-200 cursor-pointer' />
          }
        </button>
      </div>
      {mobileMenuOpen &&
        <div className='absolute top-16 left-[2.5vw] right-[2.5vw] py-2 px-2 bg-white/95
       dark:bg-gray-950/95 backdrop-blur-lg rounded-2xl border
       border-slate-400 shadow-xl overflow-hidden transition-all delay-700'>
          <ul className='space-y-1.5'>
            {navItems.map((item) => (
              <li className='hover:bg-purple-700 p-2 
          relative px-4 py-2 rounded-md font-bold transition text-gray-800 hover:text-white  
          hover:shadow font-sans list-none'
              >
                <Link to={item.slug}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li className='relative left-2'>
              <input type="text" placeholder='Samsung A07' className=' w-[90%]
        focus:outline-none bg-slate-50 px-4 py-2 rounded-md transition delay-100 focus:border
         border-slate-400 focus:border-slate-800' />
              <Search className='absolute right-10 sm:right-20 top-2  text-slate-700' />
            </li>
          </ul>

        </div>
      }
    </nav>

  )
}

export default Navbar
