'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ChatTextareaProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  placeholder?: string
  disabled?: boolean
  minRows?: number
  maxRows?: number
}

export function ChatTextarea({
  value,
  onChange,
  onKeyDown,
  placeholder = "Ask anything...",
  disabled = false,
  minRows = 1,
  maxRows = 8
}: ChatTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
    const minHeight = lineHeight * minRows
    const maxHeight = lineHeight * maxRows
    const scrollHeight = textarea.scrollHeight

    textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
  }, [value, minRows, maxRows])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full resize-none bg-transparent",
        "px-3 pt-4 pb-1",
        "text-base leading-relaxed",
        "placeholder:text-muted-foreground",
        "focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      )}
      style={{ 
        minHeight: `${minRows * 1.5}rem`,
        scrollbarWidth: 'thin'
      }}
    />
  )
}