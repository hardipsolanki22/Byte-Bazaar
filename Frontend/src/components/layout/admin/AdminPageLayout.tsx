import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet, useNavigate } from 'react-router-dom'
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../../lightswind/sidebar";

interface PageLayoutProps {
    className?: string
    noPadding?: boolean
}

const AdminPageLayout: React.FC<PageLayoutProps> = ({
    className = "",
    noPadding = false
}) => {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 ">
            <AdminNavbar />
            <main
                className={`flex w-full ${className} ${!noPadding && "p-2"}
        `}>
                <SidebarProvider  defaultExpanded>
                    <Sidebar>
                        <SidebarHeader className=''>
                            <span className="font-bold">My App</span>
                            <SidebarTrigger />
                        </SidebarHeader>

                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Main</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem value="dashboard">
                                            <SidebarMenuButton>Dashboard</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem value="settings" >
                                            <SidebarMenuButton>Settings</SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>

                        <SidebarFooter>
                            <span>Footer content</span>
                        </SidebarFooter>
                    </Sidebar>
                </SidebarProvider>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPageLayout
