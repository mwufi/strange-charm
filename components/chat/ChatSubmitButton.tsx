'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatSubmitButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function ChatSubmitButton({ onClick, disabled }: ChatSubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="icon"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={cn(
        "h-8 w-8 rounded-full",
        "bg-primary hover:bg-primary/90",
        "transition-all duration-200",
        "shadow-sm",
        disabled && "opacity-50"
      )}
    >
      <ArrowUp className="h-4 w-4" />
      <span className="sr-only">Send message</span>
    </Button>
  )
}