import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { AppSidebar } from "./aside/AppSidebar"
import { Toaster } from '../../ui/sonner'

interface PageLayoutProps {
    className?: string
    noPadding?: boolean
}

const AdminPageLayout: React.FC<PageLayoutProps> = ({
    className = "",
    noPadding = false
}) => {

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 relative">
                <Toaster />
            <AdminNavbar />
            <SidebarProvider>
                <AppSidebar />
                <main className={`flex w-full ${className} ${!noPadding && "p-2"}`}>
                    <SidebarTrigger
                        className='cursor-pointer absolute top-12 left-5 sm:left-64 sm:top-16 z-20'
                    />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    )
}

export default AdminPageLayout
