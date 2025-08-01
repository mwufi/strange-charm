"use client"

import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, ChevronDown, History } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface ConversationDisplayProps {
  messages: Message[]
  onScrollChange?: (showScrollButton: boolean) => void
  scrollContainerRef?: React.RefObject<HTMLDivElement>
  messagesEndRef?: React.RefObject<HTMLDivElement>
  className?: string
}

export function ConversationDisplay({
  messages,
  onScrollChange,
  scrollContainerRef,
  messagesEndRef,
  className
}: ConversationDisplayProps) {
  const internalScrollRef = useRef<HTMLDivElement>(null)
  const internalEndRef = useRef<HTMLDivElement>(null)
  
  const scrollRef = scrollContainerRef || internalScrollRef
  const endRef = messagesEndRef || internalEndRef

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !onScrollChange) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      onScrollChange(!isNearBottom)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [onScrollChange, scrollRef])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (messages.length === 0) {
    return (
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="relative h-full w-full animate-fade-in-015 overflow-x-hidden overflow-y-auto px-4">
          <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-6 overflow-hidden px-4 pt-8 pb-16 2xl:pt-20">
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-foreground/80 mb-2">
                  Start a new conversation
                </h1>
                <p className="text-muted-foreground">
                  Ask me anything and I'll do my best to help!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-0 flex-1 overflow-hidden", className)}>
      <div 
        ref={scrollRef}
        className="relative h-full w-full animate-fade-in-015 overflow-x-hidden overflow-y-auto px-4"
      >
        <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-6 overflow-hidden px-4 pt-8 pb-16 2xl:pt-20">
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === 'user' ? (
                // User message
                <div className="group mt-12 ml-auto flex w-full animate-fade-in-015 flex-col items-end gap-2 first:mt-0">
                  <div className="max-w-[80%] overflow-x-hidden rounded-xl border bg-input px-4 py-2.5 break-words">
                    <div className="font-medium text-foreground/80">
                      <p className="pt-4 [word-break:break-word] whitespace-pre-wrap [word-wrap:break-word] first:pt-0">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs text-muted-foreground">
                      {format(message.timestamp, 'h:mm:ss a')}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full text-muted-foreground"
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                // Assistant message
                <div className="group mt-4 flex w-full animate-fade-in-015 gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center">
                    <img 
                      alt="Assistant" 
                      src="/logo.svg" 
                      className="opacity-90"
                      width={24}
                      height={20}
                    />
                  </div>
                  <div className="flex w-full min-w-0 flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <button className="flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                        <span className="flex items-center font-medium">
                          <span>Assistant</span>
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <div className="flex items-center transition-opacity opacity-100">
                        <span className="mr-2 text-xs text-muted-foreground">
                          {format(message.timestamp, 'h:mm:ss a')}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-muted-foreground"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                        >
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-medium text-foreground/70">
                      <p className="pt-4 [word-break:break-word] whitespace-pre-wrap [word-wrap:break-word] first:pt-0">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  )
}