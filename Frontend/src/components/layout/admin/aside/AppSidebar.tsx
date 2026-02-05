import { Link, useNavigate } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "../../../ui/sidebar"
import { PlusCircle, Package, Users, Tag, PlusSquare, Inbox } from "lucide-react";
import { Button } from "../../../lightswind/button";

export function AppSidebar() {

    const navItems = [
        { title: "Add Product", url: "/admin/add-product", icon: PlusCircle },
        { title: "Products", url: "/admin/products", icon: Package },
        { title: "Users", url: "/admin/users", icon: Users },
        { title: "Coupon", url: "/admin/coupon", icon: Tag },
        { title: "Create Coupon", url: "/admin/add-coupon", icon: PlusSquare },
        { title: "Orders", url: "/admin/order", icon: Inbox },
    ];
    const navigate = useNavigate()
    return (
        <Sidebar>
            <SidebarHeader />
            {/* Top section */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-4 text-lg font-bold">
                        Byte Bazaar
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate(item.url)}
                                        className="cursor-pointer"
                                    >
                                        <item.icon className="w-5 h-5 text-slate-600" />
                                        <span className="text-slate-700 ">{item.title}</span>
                                    </Button>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}