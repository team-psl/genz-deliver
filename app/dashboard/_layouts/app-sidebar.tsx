"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import BrandLogo from "@/components/brand-logo";
import {
  Home,
  Package,
  Truck,
  MapPin,
  Plus,
  Search,
  Clock,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./user-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function isActive(url: string, pathname: string, strict: boolean = true) {
  if (strict) {
    return pathname === url
  }
  return pathname.startsWith(url)
}



export function AppSidebar() {

  const pathname = usePathname();  


  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: isActive("/dashboard", pathname),
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: Package,
      badge: "12",
      isActive: isActive("/dashboard/orders", pathname),
    },
    {
      title: "Tracking",
      url: "/dashboard/tracking",
      icon: Truck,
      isActive: isActive("/dashboard/tracking", pathname),
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: MapPin,
      isActive: isActive("/dashboard/locations", pathname),
    },
  ];

  const quickActions = [
    {
      title: "Create Order",
      url: "/dashboard/orders/new",
      icon: Plus,
      isActive: isActive("/dashboard/orders/new", pathname),
    },
    {
      title: "Track Package",
      url: "/dashboard/tracking/search",
      icon: Search,
      isActive: isActive("/dashboard/tracking/search", pathname),
    },
    {
      title: "Schedule Pickup",
      url: "/dashboard/pickup/schedule",
      icon: Clock,
      isActive: isActive("/dashboard/pickup/schedule", pathname),
    },
    {
      title: "Generate Report",
      url: "/dashboard/reports/new",
      icon: FileText,
      isActive: isActive("/dashboard/reports/new", pathname),
    },
  ];
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="overflow-hidden">
          <SidebarMenuItem>
            <Link href="/dashboard">
              <BrandLogo
                className="w-[125px] group-data-[collapsible=icon]:w-[90px] transition-all duration-200"
                mode="light"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn(item.isActive ? "text-primary" : "text-foreground")} />
                      <span className={cn(item.isActive ? "text-primary" : "text-foreground")}>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton asChild tooltip={action.title}>
                    <Link href={action.url}>
                      <action.icon className={cn(action.isActive ? "text-primary" : "text-foreground")} />
                      <span>{action.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
