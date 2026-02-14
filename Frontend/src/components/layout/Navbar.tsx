import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, User, Contact } from "lucide-react";
import { Button } from '../lightswind/button';
import { Input } from "../lightswind/input"
import HamburgerMenuOverlay from '../lightswind/hamburger-menu-overlay';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../lightswind/hover-card";
import { Avatar, AvatarImage } from '../lightswind/avatar';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem }
  from '../lightswind/command';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toast } from 'sonner';
import { logOutUser } from '../../features/user/userSlice';


type CategoriesType = {
  name: string;
  slug: string;
}

type NavItemsType = {
  name: string
  slug: string
  isActive: boolean
}
const Navbar: React.FC = () => {
  const isAuthenticated = useAppSelector(({ users }) => users.isAuthenticated)
  const user = useAppSelector(({ users }) => users.userData)
  const loading = useAppSelector(({ users }) => users.loading)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()


  const ignoreCategory = [
    "/signup", "/signin", "/account", "/checkout/cart",
    "/checkout/address", "/checkout/payment", "/my-orders"
  ]
  const navItems: NavItemsType[] = [
    {
      name: "Home",
      slug: "/",
      isActive: true
    },
    {
      name: "About",
      slug: "/about",
      isActive: true
    }
  ]

  const menuItems = [
    { label: "Home", icon: <Home size={20} />, href: "/" },
    { label: "About", icon: <User size={20} />, onClick: () => console.log("Profile") },
    { label: "Contact", icon: <Contact size={20} />, href: "/settings" }
  ];

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

  const logoutHandler = () => {
    dispatch(logOutUser())
      .unwrap()
      .then((data) => {
        toast.success(data.message)
        navigate("/signin")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (

    <>
      <nav className='hidden md:flex justify-between px-4 items-center bg-white border-b border-gray-200 h-16  '>
        <div className='gap-10 flex items-center justify-center w-[50%] lg:w-[60%] relative'>
          <Link to="/" className='flex items-center  '>
            <img src="./byteBazaar.png" alt="logo"
              className='w-24 h-24 cursor-pointer' />
          </Link>
          <Command className="rounded-lg border shadow-md w-full">
            <CommandInput placeholder="Type a product name or search..." />
            {/* <CommandList className='absolute top-16 bg-white p-4 z-50 w-[74%] lg:w-[88%]'>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions" >
                <CommandItem>
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <span>Launch Email</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem>
                  <span>Profile</span>
                </CommandItem>
                <CommandItem>
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList> */}
          </Command>
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

          {!!!isAuthenticated &&
            <>
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
            </>
          }
          {!!isAuthenticated &&
            <li className='inline-block mx-4'>
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Button variant='link' className='cursor-pointer'>
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt="@shadcn" />
                    </Avatar>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="p-2">
                    <Link to="/account">
                      <Button variant="ghost" className="w-full text-left mb-2 cursor-pointer">
                        My Account
                      </Button>
                    </Link>
                    <Link to="/my-orders">
                      <Button variant="ghost" className="w-full text-left mb-2 cursor-pointer">
                        My Orders
                      </Button>
                    </Link>
                    <Button
                      onClick={logoutHandler}
                      disabled={loading === "pending"}
                      variant="ghost" className="w-full text-left cursor-pointer">
                      Logout
                    </Button>
                    <Link to="/admin">
                      <Button variant="ghost" className="w-full text-left mb-2 cursor-pointer">
                        Admin
                      </Button>
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </li>}
          <li className='inline-block relative'>
            <Button
              onClick={() => navigate("/checkout/cart")}
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
