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
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronUp,
  LogOut,
  UserCircle,
  Settings,
  Shield,
  HelpCircle,
  ChevronsUpDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/user-avatar";

// Helper function to get user initials
const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Skeleton loading component
const UserMenuSkeleton = () => (
  <SidebarMenuButton size="lg" className="cursor-not-allowed">
    <Skeleton className="h-8 w-8 rounded-lg" />
    <div className="grid flex-1 text-left text-sm leading-tight gap-1">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-32" />
    </div>
    <ChevronUp className="ml-auto size-4 text-sidebar-foreground/70" />
  </SidebarMenuButton>
);

export function UserMenu() {
  const router = useRouter();
  const { data: sessionData, error, isPending } = authClient.useSession();

  const user = sessionData?.user;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      authClient.signOut();
      window.location.href = "/sign-in";
    }
  }, [error]);

  const userInitials = getUserInitials(user?.name || "User");

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          console.error("Logout failed:", error);
        },
      },
    });
  };

  // Show skeleton while loading
  if (isPending || user === undefined) {
    return <UserMenuSkeleton />;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        >
          {isPending ? (
            <UserMenuSkeleton />
          ) : (
            <>
              <Avatar className="h-10 w-10 rounded-lg ring-2 ring-primary/20">
                <AvatarImage
                  src={user?.image || "/placeholder-user.jpg"}
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold font-nunito">
                  {user?.name}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </>
          )}
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
              <AvatarImage
                src={user?.image || "/placeholder-user.jpg"}
                alt={user?.name || "User"}
              />
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left">
              <span className="font-semibold text-sm">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email || "user@example.com"}
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
            <Link href="/dashboard/profile" className="flex items-center gap-3">
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
                <div className="text-sm font-medium">Help & Support</div>
                <div className="text-xs text-muted-foreground">
                  Get assistance
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Logout */}
        <DropdownMenuItem
          onSelect={handleLogout}
          className="px-3 py-2 rounded-lg cursor-pointer hover:bg-red-500/10 hover:text-red-600 transition-colors"
        >
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
