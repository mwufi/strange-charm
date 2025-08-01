"use client"

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatHeaderProps {
  title: string
  onSearchClick?: () => void
  className?: string
  children?: React.ReactNode
}

export function ChatHeader({
  title,
  onSearchClick,
  className,
  children
}: ChatHeaderProps) {
  return (
    <div className={cn("px-4 py-2 flex items-center justify-between", className)}>
      <h1 className="text-sm font-medium">{title}</h1>
      <div className="flex items-center gap-2">
        {children}
        {onSearchClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSearchClick}
          >
            <Search className="h-4 w-4 mr-2" />
            Search (⌘K)
          </Button>
        )}
      </div>
    </div>
  )
}