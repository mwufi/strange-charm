"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChatInput } from '@/components/chat/ChatInput'
import {
  Copy,
  ChevronDown,
  Files,
  BellOff,
  Share,
  History,
  ArrowUp,
  AtSign,
  Upload
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (message: string, mentions: any[], attachments: any[], options?: any) => {
    if (!message.trim() && attachments.length === 0) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: `I understand you're asking about "${message}". Let me help you with that...`,
      timestamp: new Date(),
      isStreaming: false
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex max-viewport-height w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 flex w-full items-center justify-between gap-4 bg-background p-2 transition-[border] border-b border-transparent 2xl:absolute 2xl:border-transparent 2xl:bg-transparent">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 opacity-0 md:opacity-100">
          <h1 className="animate-fade-in-015 truncate text-sm font-medium">New Chat</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-3 has-[>svg]:px-2 text-foreground/70"
          >
            <Files className="h-4 w-4" />
            <span className="hidden md:block">Files</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-3 has-[>svg]:px-2 text-foreground/70"
          >
            <BellOff className="h-4 w-4" />
            <span className="hidden md:block">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-3 has-[>svg]:px-2 text-foreground/70"
          >
            <Share className="h-4 w-4" />
            <span className="hidden md:block">Share</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="relative h-full w-full animate-fade-in-015 overflow-x-hidden overflow-y-auto px-4"
        >
          <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-6 overflow-hidden px-4 pt-8 pb-16 2xl:pt-20">
            {messages.length === 0 ? (
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
            ) : (
              messages.map((message) => (
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
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="sticky bottom-[env(safe-area-inset-bottom)] z-20 px-4">
        {/* Scroll to bottom button */}
        <div className="absolute inset-x-0 -top-10 flex justify-center">
          <div className={cn(
            "transition-opacity",
            showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-full border-border shadow-xs bg-background dark:bg-input/80 dark:hover:bg-input/50"
              onClick={scrollToBottom}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col">
          {/* Status bar */}
          <div className="mx-6 flex items-center gap-2 rounded-t-xl border-x border-t bg-input px-3 py-2 text-sm font-medium text-muted-foreground">
            <div className="size-3 rounded-full bg-primary"></div>
            Assistant is waiting for your response
          </div>

          {/* Input form */}
          <form
            className="flex w-full flex-col rounded-xl border shadow-xs transition-all"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const message = formData.get('message') as string
              handleSubmit(message, [], [])
              e.currentTarget.reset()
            }}
          >
            <textarea
              name="message"
              placeholder="Type your message..."
              className="flex h-14 min-h-14 w-full resize-none p-3 transition-all placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              style={{ scrollbarWidth: 'none', height: '48px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  const form = e.currentTarget.form
                  if (form) {
                    form.requestSubmit()
                  }
                }
              }}
            />
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 px-3 has-[>svg]:px-2 bg-primary/20 text-primary hover:bg-primary/10 hover:text-primary dark:text-primary-foreground dark:hover:bg-primary/5 dark:hover:text-primary-foreground"
                >
                  <AtSign className="h-4 w-4" />
                  Add context
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full text-muted-foreground"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="size-8 rounded-full flex-shrink-0 bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-primary/70 dark:hover:bg-primary/60"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="h-4 bg-background"></div>
      </div>
    </div>
  )
}