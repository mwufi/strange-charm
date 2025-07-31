"use client"

import { NavUser } from "@/components/nav-user"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarFooterContent({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <div className="relative">
      <NavUser user={user} />
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute bottom-3 right-2 size-10 rounded-full",
          "text-muted-foreground hover:text-foreground",
          "transition-colors"
        )}
        onClick={toggleSidebar}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={cn(
            "transition-transform duration-200",
            state === "collapsed" ? "" : "rotate-180"
          )}
        >
          <path d="m6 17 5-5-5-5"></path>
          <path d="m13 17 5-5-5-5"></path>
        </svg>
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  )
}