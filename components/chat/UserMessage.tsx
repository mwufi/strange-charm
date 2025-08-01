"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface UserMessageProps {
  content: string
  timestamp: Date
  className?: string
}

export function UserMessage({
  content,
  timestamp,
  className
}: UserMessageProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group mt-12 ml-auto flex w-full flex-col items-end gap-2 first:mt-0", className)}>
      <div className="max-w-[80%] overflow-x-hidden rounded-xl border bg-input px-4 py-2.5 break-words">
        <div className="font-medium text-foreground/80">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-xs text-muted-foreground">
          {format(timestamp, 'h:mm:ss a')}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-muted-foreground"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}