"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  ChevronUp,
  LogOut,
  UserCircle,
  Settings,
  Shield,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
}

const defaultUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder-user.jpg",
  initials: "JD",
};

export function UserMenu({ user = defaultUser }: UserMenuProps) {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
        >
          <Avatar className="h-8 w-8 rounded-lg ring-2 ring-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-sidebar-foreground">
              {user.name}
            </span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              {user.email}
            </span>
          </div>
          <ChevronUp className="ml-auto size-4 text-sidebar-foreground/70 transition-transform duration-200 group-data-[state=open]/menu-item:rotate-180" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] mb-2 p-2 rounded-xl shadow-lg bg-background/95 backdrop-blur-md"
        side="left"
        align="start"
        sideOffset={8}
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-0 font-normal mb-2">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-muted/50">
            <Avatar className="h-10 w-10 rounded-lg ring-2 ring-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left">
              <span className="font-semibold text-sm">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        {/* Account Section */}
        <div className="space-y-1 mb-2">
          <DropdownMenuItem
            asChild
            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
          >
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                <UserCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Profile</div>
                <div className="text-xs text-muted-foreground">
                  Manage your account
                </div>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
          >
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                <Settings className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Settings</div>
                <div className="text-xs text-muted-foreground">
                  Preferences & config
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        {/* Additional Options */}
        <div className="space-y-1 mb-2">
          <DropdownMenuItem
            asChild
            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
          >
            <Link
              href="/dashboard/security"
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10">
                <Shield className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Security</div>
                <div className="text-xs text-muted-foreground">
                  Password & 2FA
                </div>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
          >
            <Link href="/help" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10">
                <HelpCircle className="h-4 w-4 text-cyan-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">
                  Help & Support
                </div>
                <div className="text-xs text-muted-foreground">
                  Get assistance
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Logout */}
        <DropdownMenuItem onSelect={()=>{
            router.push("/")
        }} className="px-3 py-2 rounded-lg cursor-pointer hover:bg-red-500/10 hover:text-red-600 transition-colors">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10">
              <LogOut className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Sign out</div>
              <div className="text-xs text-muted-foreground">
                End your session
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
