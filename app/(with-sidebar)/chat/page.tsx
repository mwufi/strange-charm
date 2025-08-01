"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChatInput } from '@/components/chat/ChatInput'
import { ConversationDisplay } from '@/components/chat/ConversationDisplay'
import { 
  ChevronDown,
  Files,
  BellOff,
  Share,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

// Sample chat data - same as before
const chatsData: Record<string, any> = {
  "1": {
    title: "Desktop AI Chat: Multi-Agent",
    messages: [
      { id: "1", role: "user", content: "I need help setting up a multi-agent desktop AI chat application", timestamp: new Date() },
      { id: "2", role: "assistant", content: "I'd be happy to help you set up a multi-agent desktop AI chat application! Let me break this down into key components:\n\n1. **Architecture Overview**\n2. **Agent Design**\n3. **Communication Protocol**\n4. **UI Implementation**\n\nWhich aspect would you like to start with?", timestamp: new Date() },
      { id: "3", role: "user", content: "Let's start with the architecture overview", timestamp: new Date() },
      { id: "4", role: "assistant", content: "Great choice! Here's a comprehensive architecture overview for your multi-agent desktop AI chat application:\n\n## Core Components\n\n### 1. Agent Manager\n- Handles agent lifecycle (creation, deletion, state management)\n- Routes messages between agents\n- Manages agent capabilities and permissions\n\n### 2. Communication Bus\n- Implements pub/sub pattern for inter-agent communication\n- Handles message queuing and delivery\n- Supports both synchronous and asynchronous messaging\n\n### 3. Agent Types\n- **Conversational Agent**: Handles natural language interactions\n- **Task Agent**: Executes specific tasks (file operations, API calls)\n- **Coordinator Agent**: Orchestrates complex workflows\n\n### 4. Storage Layer\n- Conversation history\n- Agent state persistence\n- User preferences and settings\n\nWould you like me to elaborate on any of these components?", timestamp: new Date() }
    ]
  },
  "2": {
    title: "Create Goal-Setting System",
    messages: [
      { id: "1", role: "user", content: "I want to create a goal-setting system with tracking capabilities", timestamp: new Date() },
      { id: "2", role: "assistant", content: "I'll help you create a comprehensive goal-setting system with tracking capabilities. Let's design this step by step:\n\n## Key Features\n\n1. **Goal Creation & Management**\n   - SMART goal framework\n   - Categories and tags\n   - Priority levels\n\n2. **Progress Tracking**\n   - Milestone tracking\n   - Progress visualization\n   - Time-based analytics\n\n3. **Motivation System**\n   - Achievements and badges\n   - Streak tracking\n   - Reminder notifications\n\nWhat type of goals are you primarily targeting? Personal, professional, or both?", timestamp: new Date() }
    ]
  },
  "3": {
    title: "E2B Setup & Backend Architecture",
    messages: [
      { id: "1", role: "user", content: "Help me set up E2B integration for my backend", timestamp: new Date() },
      { id: "2", role: "assistant", content: "I'll guide you through setting up E2B (Elastic Backend) integration. Here's what we'll cover:\n\n## Setup Steps\n\n1. **Environment Configuration**\n2. **API Integration**\n3. **Security Setup**\n4. **Testing & Deployment**\n\nLet's start with the environment configuration. Do you have your E2B API keys ready?", timestamp: new Date() }
    ]
  }
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params?.id as string
  
  // Determine if we're on a specific chat or new chat
  const isNewChat = !chatId
  const chat = chatId ? chatsData[chatId] : null
  const initialMessages = chat?.messages || []
  
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      content: isNewChat 
        ? `I understand you're asking about "${message}". Let me help you with that...`
        : `Thank you for your message. This is a demo response to: "${message}"`,
      timestamp: new Date(),
      isStreaming: false
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    
    // If it's a new chat, we could redirect to a new chat ID here
    // For now, we'll just keep the messages in the current view
  }

  const title = chat?.title || "New Chat"

  return (
    <div className="flex adjusted-h-dvh w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 flex w-full items-center justify-between gap-4 bg-background p-2 transition-[border] border-b border-transparent 2xl:absolute 2xl:border-transparent 2xl:bg-transparent">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 opacity-0 md:opacity-100">
          <h1 className="animate-fade-in-015 truncate text-sm font-medium">{title}</h1>
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
      <ConversationDisplay
        messages={messages}
        onScrollChange={setShowScrollButton}
        scrollContainerRef={scrollContainerRef}
        messagesEndRef={messagesEndRef}
      />

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
          <ChatInput
            onSubmit={handleSubmit}
            placeholder={isNewChat ? "Type your message..." : "Follow up with Assistant..."}
            showStatus
          />
        </div>
        <div className="h-4 bg-background"></div>
      </div>
    </div>
  )
}