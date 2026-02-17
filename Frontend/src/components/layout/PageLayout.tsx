import type React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Toaster } from "../ui/sonner"
import { useEffect } from "react"
import { useAppSelector } from "../../app/hooks"

interface PageLayoutProps {
  className?: string
  noPadding?: boolean
  noFooter?: boolean
  authentication?: boolean
}

const PageLayout = ({
  className = "",
  noFooter = false,
  noPadding = false,
}: PageLayoutProps) => {

  const location = useLocation()
  const hideFooterPaths = ["/signin", "/signup"]
  if (hideFooterPaths.includes(location.pathname)) {
    noFooter = true
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 ">
      <Toaster />
      <Navbar />
      <main
        className={`flex-auto w-full ${className} ${!noPadding && "p-2"}
        `}>
        <Outlet />
      </main>
      {!noFooter && <Footer />}
    </div>
  )
}

export default PageLayout
