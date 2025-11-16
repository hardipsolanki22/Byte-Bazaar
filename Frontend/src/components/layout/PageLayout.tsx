import type React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface PageLayoutProps {
childern: React.ReactNode
className?: string
noPadding?:boolean
noFooter?:boolean
}

const PageLayout:React.FC<PageLayoutProps> = ({
    childern,
    className,
    noFooter = false,
    noPadding = false
}) =>  {
  return (
    <div className="min-h-screen flex flex-col bg-white ">
        <Navbar/>
        <main 
        className={`flex-auto w-full ${className} ${!noPadding && "p-12 md:p-2"}
        `}>
                {childern}
        </main>
        {!noFooter && <Footer/>}
    </div>
  )
}

export default PageLayout
