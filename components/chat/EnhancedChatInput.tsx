"use client"

import { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AtSign,
  Upload,
  ArrowUp,
  X,
  File,
  Image as ImageIcon,
  Paperclip,
  Hash,
  User,
  Bot
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Mention {
  id: string
  type: 'user' | 'agent' | 'channel'
  name: string
  avatar?: string
}

interface Attachment {
  id: string
  name: string
  size: string
  type: string
}

interface EnhancedChatInputProps {
  onSubmit: (message: string, mentions: Mention[], attachments: Attachment[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  showStatus?: boolean
  statusText?: string
}

// Sample mention suggestions
const mentionSuggestions: Mention[] = [
  { id: '1', type: 'user', name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
  { id: '2', type: 'user', name: 'Bob Smith', avatar: '/avatars/bob.jpg' },
  { id: '3', type: 'agent', name: 'Code Assistant' },
  { id: '4', type: 'agent', name: 'Research Agent' },
  { id: '5', type: 'channel', name: 'general' },
  { id: '6', type: 'channel', name: 'engineering' },
]

export function EnhancedChatInput({
  onSubmit,
  placeholder = "Type a message...",
  className,
  disabled = false,
  maxLength = 2000,
  showStatus = true,
  statusText = "Assistant is ready"
}: EnhancedChatInputProps) {
  const [input, setInput] = useState('')
  const [mentions, setMentions] = useState<Mention[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && attachments.length === 0) return
    
    onSubmit(input, mentions, attachments)
    setInput('')
    setMentions([])
    setAttachments([])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
    
    if (e.key === '@') {
      setShowMentions(true)
      setCursorPosition(e.currentTarget.selectionStart || 0)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    
    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf('@')
    if (lastAtIndex >= 0 && lastAtIndex === value.length - 1) {
      setShowMentions(true)
      setMentionFilter('')
    } else if (lastAtIndex >= 0 && showMentions) {
      const filter = value.substring(lastAtIndex + 1)
      setMentionFilter(filter)
    } else {
      setShowMentions(false)
    }
  }

  const insertMention = (mention: Mention) => {
    const beforeCursor = input.substring(0, cursorPosition)
    const afterCursor = input.substring(cursorPosition)
    const lastAtIndex = beforeCursor.lastIndexOf('@')
    
    const newText = 
      input.substring(0, lastAtIndex) + 
      `@${mention.name} ` + 
      afterCursor
    
    setInput(newText)
    setMentions([...mentions, mention])
    setShowMentions(false)
    textareaRef.current?.focus()
  }

  const filteredMentions = mentionSuggestions.filter(m => 
    m.name.toLowerCase().includes(mentionFilter.toLowerCase())
  )

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type
    }))
    setAttachments([...attachments, ...newAttachments])
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id))
  }

  const getMentionIcon = (type: Mention['type']) => {
    switch (type) {
      case 'user': return <User className="h-3 w-3" />
      case 'agent': return <Bot className="h-3 w-3" />
      case 'channel': return <Hash className="h-3 w-3" />
    }
  }

  return (
    <div className={cn("mx-auto flex max-w-3xl flex-col", className)}>
      {showStatus && (
        <div className="mx-6 flex items-center gap-2 rounded-t-xl border-x border-t bg-input px-3 py-2 text-sm font-medium text-muted-foreground">
          <div className="size-3 rounded-full bg-primary animate-pulse"></div>
          {statusText}
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit}
        className="relative flex w-full flex-col rounded-xl border shadow-xs transition-all"
      >
        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 border-b">
            {attachments.map(attachment => (
              <div 
                key={attachment.id}
                className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm"
              >
                {attachment.type.startsWith('image/') ? (
                  <ImageIcon className="h-4 w-4" />
                ) : (
                  <File className="h-4 w-4" />
                )}
                <span className="max-w-[150px] truncate">{attachment.name}</span>
                <span className="text-muted-foreground">({attachment.size})</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.id)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Mention Popover */}
        {showMentions && (
          <div className="absolute bottom-full mb-2 left-0 right-0 mx-3">
            <div className="rounded-lg border bg-popover p-1 shadow-md">
              <div className="max-h-48 overflow-y-auto">
                {filteredMentions.map(mention => (
                  <button
                    key={mention.id}
                    type="button"
                    onClick={() => insertMention(mention)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                      {getMentionIcon(mention.type)}
                    </div>
                    <span className="flex-1 text-left">{mention.name}</span>
                    <span className="text-xs text-muted-foreground">{mention.type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className="flex min-h-[56px] w-full resize-none p-3 transition-all placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={{ scrollbarWidth: 'none' }}
        />

        {/* Actions */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="h-8 gap-1.5 px-3"
                >
                  <AtSign className="h-4 w-4" />
                  Mention
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium mb-2">Quick mentions</p>
                  {mentionSuggestions.slice(0, 4).map(mention => (
                    <button
                      key={mention.id}
                      type="button"
                      onClick={() => {
                        setInput(input + `@${mention.name} `)
                        setMentions([...mentions, mention])
                      }}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                        {getMentionIcon(mention.type)}
                      </div>
                      <span>{mention.name}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="h-8 gap-1.5 px-3"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="h-4 w-4" />
              Attach
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {input.length > 0 && (
              <span className={cn(
                "text-xs text-muted-foreground",
                input.length > maxLength * 0.9 && "text-destructive"
              )}>
                {input.length}/{maxLength}
              </span>
            )}
            <Button
              size="icon"
              className="h-8 w-8 rounded-full"
              type="submit"
              disabled={disabled || (!input.trim() && attachments.length === 0)}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}