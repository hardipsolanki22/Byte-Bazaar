import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Home, User, Contact, HomeIcon, UserIcon, SettingsIcon, ShoppingBag, Info, LayoutDashboard } from "lucide-react";
import { Button } from '../lightswind/button';
import { Input } from "../lightswind/input"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../lightswind/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from '../lightswind/avatar';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem }
  from '../lightswind/command';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toast } from 'sonner';
import { logOutUser } from '../../features/auth/authSlice';
import { getCategories } from '../../features/category/categorySlice';
import { getUserCart } from '../../features/cart/cartSlice';
import { CategoryTabsSkeleton } from '../skeleton/categorySkeleton';


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
  const categories = useAppSelector(({ category }) => category.catagories)
  const categoryLoading = useAppSelector(({ category }) => category.loading)
  const cartItems = useAppSelector(({ cart }) => cart.cart?.items)
  const user = useAppSelector(({ users }) => users.userData)
  const loading = useAppSelector(({ users }) => users.loading)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!categories?.length) dispatch(getCategories())
    if (!cartItems?.length) dispatch(getUserCart())
  }, [dispatch])


  const ignoreCategory = [
    "/signup",
    "/signin",
    "/account",
    "/checkout/cart",
    "/checkout/address",
    "/checkout/payment",
    "/about",
    "/orders",
  ]

  // Dynamic route prefixes alag rakhvo
  const ignoreCategoryPrefixes = [
    "/my-orders/",       // /my-orders/:orderId
    "/verify-email/",    // /verify-email/:token
    "/forgot-password/", // /forgot-password/:token
    "/rating/",          // /rating/:slug
    "/admin",            // all admin routes
  ]

  const shouldHideCategory =
    ignoreCategory.includes(location.pathname) ||
    ignoreCategoryPrefixes.some((prefix) => location.pathname.startsWith(prefix))

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

  const navItemsForMobile = [
    { slug: "/", label: "Home", Icon: Home },
    { slug: "/my-orders", label: "Orders", Icon: ShoppingBag },
    { slug: "/account", label: "Profile", Icon: User },
    { slug: "/about", label: "About", Icon: Info },
    ...(user?.role === "ADMIN"
      ? [{ slug: "/admin/add-product", label: "Admin", Icon: LayoutDashboard }]
      : []),
  ];;



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
        <Link to="/" className='flex items-center  '>
          <img src="/byteBazaar.png" alt="logo"
            className='w-24 h-24 cursor-pointer' />
        </Link>

        <ul className="flex items-center">
          {/* Nav items — unchanged */}
          {navItems.map((item, index) => (
            <li key={index} className="inline-block mx-2">
              <Button variant="ghost"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(item.slug)}>
                {item.name}
              </Button>
            </li>
          ))}

          {/* Login / Sign Up — unchanged */}
          {!!!isAuthenticated && (
            <>
              <li className="inline-block">
                <Button onClick={() => navigate("/signin")} variant="github" className="cursor-pointer">
                  Login
                </Button>
              </li>
              <li className="inline-block mx-4">
                <Button onClick={() => navigate("/signup")} className="cursor-pointer">
                  Sign Up
                </Button>
              </li>
            </>
          )}

          {/* ── Avatar — fixed: remove variant='link', center with flex ── */}
          {!!isAuthenticated && (
            <li className="inline-flex items-center mx-4">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <button className="cursor-pointer flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={user?.avatar} alt={user?.fullName ?? "user"} />
                      <AvatarFallback className="text-sm font-semibold">
                        {user?.fullName?.[0]?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
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
                      variant="ghost"
                      className="w-full text-left cursor-pointer">
                      Logout
                    </Button>
                    {user?.role === "ADMIN" && (
                      <Link to="/admin/add-product">
                        <Button variant="ghost" className="w-full text-left mb-2 cursor-pointer">
                          Admin
                        </Button>
                      </Link>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </li>
          )}

          {/* Cart */}
          <li className="inline-flex items-center relative">
            <Button onClick={() => navigate("/checkout/cart")} variant="link" className="cursor-pointer p-2">
              <img src="/shopping-cart.png" alt="cart" className="w-6 h-6" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartItems?.length ?? 0}
            </span>
          </li>

        </ul>
      </nav>

      {/* For Mobile */}
      <nav className='flex justify-between items-center md:hidden px-4 h-16 bg-white border-b border-gray-200'>
        <Link to="/" className='flex items-center'>
          <img src="/byteBazaar.png" alt="logo" className='w-16 h-16 cursor-pointer' />
        </Link>

        {/* Cart with correct relative positioning */}
        <div className="relative inline-flex items-center">
          <Button
            onClick={() => navigate("/checkout/cart")}
            variant='link'
            className='cursor-pointer p-2'>
            <img src="/shopping-cart.png" alt="cart" className="w-6 h-6" />
          </Button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white
      rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold pointer-events-none">
            {cartItems?.length ?? 0}
          </span>
        </div>
      </nav>

      {/* Show categories */}
      {!shouldHideCategory && (
        categoryLoading === "pending"
          ? <CategoryTabsSkeleton />
          : (
            <div className="flex w-full text-center items-center justify-center
        space-x-2 overflow-x-auto md:p-2 border-b border-gray-200 bg-white md:mt-1">
              {categories?.map((category, idx) => (
                <Button
                  variant="link"
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => navigate(`/products?category=${category.slug}`)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          )
      )}

      {/* Bottom Nav for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:hidden">
        <nav
          className="relative flex items-center justify-around rounded-2xl px-2 py-2 mx-auto max-w-sm"
          style={{
            background: "rgba(10, 10, 14, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 -4px 40px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
          }}
        >
          {navItemsForMobile.map(({ slug, label, Icon }) => {
            return (
              <NavLink
                to={slug}
                key={slug}
                className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer group"
                style={{ minWidth: 56 }}
                aria-label={label}
              >
                {({ isActive }) => (
                  <>
                    {/* Active background pill */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          boxShadow: "0 -4px 16px 2px rgba(140,180,255,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                        }}
                      />
                    )}

                    {/* Top glow bar (tubelight) */}
                    {isActive && (
                      <span
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(180,210,255,0.95), transparent)",
                          boxShadow: "0 0 10px 3px rgba(150,200,255,0.6)",
                        }}
                      />
                    )}

                    {/* Icon */}
                    <span
                      className="relative z-10 transition-all duration-300"
                      style={{
                        color: isActive ? "#c8dcff" : "rgba(255,255,255,0.3)",
                        filter: isActive ? "drop-shadow(0 0 6px rgba(160,210,255,0.8))" : "none",
                        transform: isActive ? "scale(1.15) translateY(-1px)" : "scale(1)",
                      }}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                    </span>

                    {/* Label */}
                    <span
                      className="relative z-10 text-[10px] font-semibold tracking-wide transition-all duration-300"
                      style={{
                        color: isActive ? "rgba(200,224,255,0.9)" : "rgba(255,255,255,0.22)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

    </>

  )
}

export default Navbar 
