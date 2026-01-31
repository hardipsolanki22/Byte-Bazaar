import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, BaggageClaim, User, Contact } from "lucide-react";
import { Button } from '../lightswind/button';
import HamburgerMenuOverlay from '../lightswind/hamburger-menu-overlay';

const Navbar: React.FC = () => {
  type NavItemsType = {
    name: string
    slug: string
    isActive: boolean
  }


  const location = useLocation()
  const ignoreCategory = ["/signup", "/signin", "/account", "/cart"]
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


  type CategoriesType = {
    name: string;
    slug: string;
  }

  const categories: CategoriesType[] = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Books", slug: "books" },
    { name: "Toys & Games", slug: "toys-games" },
    { name: "Sports", slug: "sports" },
    { name: "Beauty", slug: "beauty" },
    { name: "Automotive", slug: "automotive" },
    { name: "Grocery", slug: "grocery" },
    { name: "Health", slug: "health" },
    { name: "Garden", slug: "garden" },
    { name: "Music", slug: "music" },
    { name: "Office Supplies", slug: "office-supplies" },
    { name: "Pet Supplies", slug: "pet-supplies" },
    { name: "Baby Products", slug: "baby-products" },




  ]

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
                onClick={() => { navigate(item.slug) }}>
                {item.name}
              </Button>
            </li>
          ))}
          <li className='inline-block'>
            <Button
              onClick={() => navigate("/signin")}
              variant='github'
              className='cursor-pointer'>
              Login
            </Button>
          </li>
          <li className='inline-block mx-4'>
            <Button
              onClick={() => navigate("/signup")}
              className='cursor-pointer'>
              Sign Up
            </Button>
          </li>
          <li className='inline-block relative'>
            <Button
              onClick={() => navigate("/cart")}
              variant='link'
              className='cursor-pointer'>
              <img src="./shopping-cart.png" alt="cart"
              className="w-6 h-6 " />
            </Button>
            <span className="absolute top-0 right-0 bg-red-500 text-white
             rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
          </li>
        </ul>
      </nav>

      <HamburgerMenuOverlay
        items={menuItems}
        className='md:hidden' />

      {!ignoreCategory.includes(location.pathname) &&
        <div className="flex w-full text-center items-center justify-center
       space-x-2 overflow-x-auto p-2  border-b border-gray-200 bg-white mt-1">
          {categories.map((category, idx) => (
            <Button
              variant="link"
              key={idx}
              className="cursor-pointer"
            >
              {category.name}
            </Button>
          ))}
        </div>
      }
    </>

  )
}

export default Navbar
