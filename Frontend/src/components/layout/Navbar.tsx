import React from 'react'
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  type NavItemsType = {
    name: string
    slug: string
    isActive: boolean
  }
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
    <nav className='  h-20 fixed top-4 left-4 right-4 bg-slate-200 text-slate-900 flex
     justify-between px-4 items-center rounded-full'>
      <div className='gap-4 flex '>
        <Link to="/">
          ByteBazaae
        </Link>
        <input type="text" placeholder='Samsung A07' className='md:w-96 sm:w-60 hidden sm:block' />
      </div>
      <ul className='sm:flex gap-12 hidden'>
        {navItems.map((item) => (
          <li>
            <Link to={item.slug}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <button className='sm:hidden'>
         &#8801;
      </button>
    </nav>
  )
}

export default Navbar
