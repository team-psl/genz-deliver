"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/language-toggle";
import { Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 bg-background items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            {/* Search functionality can be added here later */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
