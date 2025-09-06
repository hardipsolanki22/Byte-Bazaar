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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Navbar/>
        <main 
        className={`flex-auto w-full ${className && className} ${!noPadding && "pt-24 pb-16 md:pt-28 md:pb-20"}
        `}>
            <div className=" p-4 w-full">
                {childern}
            </div>
        </main>
        {!noFooter && <Footer/>}
    </div>
  )
}

export default PageLayout
