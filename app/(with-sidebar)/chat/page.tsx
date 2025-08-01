'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatInput } from '@/components/chat/ChatInput'
import { 
  Copy, 
  ChevronDown,
} from 'lucide-react'
import { format } from 'date-fns'

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
  const [showSearch, setShowSearch] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <ChatHeader
        title="New Chat"
        onSearchClick={() => setShowSearch(true)}
      />

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
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
                    <div className="group mt-12 ml-auto flex w-full flex-col items-end gap-2 first:mt-0">
                      <div className="max-w-[80%] overflow-x-hidden rounded-xl border bg-input px-4 py-2.5 break-words">
                        <div className="font-medium text-foreground/80">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="text-xs text-muted-foreground">
                          {format(message.timestamp, 'h:mm:ss a')}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Assistant message
                    <div className="group mt-4 flex w-full gap-4">
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
                              className="h-8 w-8 rounded-full text-muted-foreground"
                              onClick={() => copyToClipboard(message.content)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="font-medium text-foreground/70">
                          <p className="whitespace-pre-wrap">{message.content}</p>
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
      </ScrollArea>

      {/* Input area */}
      <div className="border-t">
        <div className="px-4">
          <div className="mx-auto max-w-3xl">
            <ChatInput
              onSubmit={handleSubmit}
              placeholder="Type your message..."
              showStatus
            />
          </div>
        </div>
      </div>
    </div>
  )
}