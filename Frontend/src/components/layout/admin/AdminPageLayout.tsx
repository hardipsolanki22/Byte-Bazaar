import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { AppSidebar } from "./aside/AppSidebar"

interface PageLayoutProps {
    className?: string
    noPadding?: boolean
}

const AdminPageLayout: React.FC<PageLayoutProps> = ({
    className = "",
    noPadding = false
}) => {

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 ">
            <AdminNavbar />
            <SidebarProvider>
                <AppSidebar />
                <main className={`flex w-full ${className} ${!noPadding && "p-2"}`}>
                    <SidebarTrigger className='cursor-pointer' />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    )
}

export default AdminPageLayout
