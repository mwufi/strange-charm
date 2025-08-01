"use client"

import { cn } from '@/lib/utils'

interface AssistantStatusBarProps {
  status?: 'ready' | 'thinking' | 'typing' | 'error'
  message?: string
  className?: string
}

export function AssistantStatusBar({ 
  status = 'ready',
  message,
  className 
}: AssistantStatusBarProps) {
  const statusColors = {
    ready: 'bg-primary',
    thinking: 'bg-yellow-500',
    typing: 'bg-blue-500',
    error: 'bg-destructive'
  }

  const defaultMessages = {
    ready: 'Assistant is ready',
    thinking: 'Assistant is thinking...',
    typing: 'Assistant is typing...',
    error: 'Connection error'
  }

  return (
    <div className={cn(
      "mx-6 flex items-center gap-2 rounded-t-xl border-x border-t bg-input px-3 py-2 text-sm font-medium text-muted-foreground",
      className
    )}>
      <div className={cn("size-3 rounded-full animate-pulse", statusColors[status])} />
      {message || defaultMessages[status]}
    </div>
  )
}