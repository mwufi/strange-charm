"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarSearch({ className }: { className?: string }) {
  return (
    <button
      data-sidebar="search-button"
      className={cn(
        "flex items-center gap-2 w-full h-10 px-[7px] mx-[.125rem]",
        "rounded-full border border-border",
        "text-sm text-muted-foreground",
        "hover:text-accent-foreground",
        "transition-colors duration-200",
        "justify-start",
        className
      )}
    >
      <div className="flex items-center justify-center size-6 shrink-0">
        <Search className="size-[18px]" strokeWidth={2} />
      </div>
      <span className="flex-1 text-left">Search</span>
      <span className="text-xs opacity-60">⌘K</span>
    </button>
  )
}