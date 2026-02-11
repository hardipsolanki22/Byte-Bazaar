import type React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router-dom"

interface PageLayoutProps {
  className?: string
  noPadding?: boolean
  noFooter?: boolean
}

const PageLayout = ({
  className = "",
  noFooter = false,
  noPadding = false
}: PageLayoutProps) => {

  const location = useLocation()
  const hideFooterPaths = ["/signin", "/signup"]
  if (hideFooterPaths.includes(location.pathname)) {
    noFooter = true
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 ">
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
