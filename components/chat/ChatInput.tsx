"use client"

import { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Bot,
  Globe,
  Search,
  Wrench,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AssistantStatusBar } from './AssistantStatusBar'

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

interface ChatInputProps {
  onSubmit: (message: string, mentions: Mention[], attachments: Attachment[], options?: ChatOptions) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  showControls?: boolean
  showStatus?: boolean
  statusProps?: {
    status?: 'ready' | 'thinking' | 'typing' | 'error'
    message?: string
  }
  defaultModel?: string
  models?: { value: string; label: string }[]
  defaultToggles?: {
    webSearch?: boolean
    tools?: boolean
  }
}

interface ChatOptions {
  model: string
  webSearch: boolean
  tools: boolean
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

const defaultModels = [
  { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
]

export function ChatInput({
  onSubmit,
  placeholder = "Type a message...",
  className,
  disabled = false,
  maxLength = 2000,
  showControls = false,
  showStatus = false,
  statusProps,
  defaultModel = 'claude-3.5-sonnet',
  models = defaultModels,
  defaultToggles = { webSearch: false, tools: false }
}: ChatInputProps) {
  const [input, setInput] = useState('')
  const [mentions, setMentions] = useState<Mention[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const [selectedModel, setSelectedModel] = useState(defaultModel)
  const [webSearchEnabled, setWebSearchEnabled] = useState(defaultToggles.webSearch || false)
  const [toolsEnabled, setToolsEnabled] = useState(defaultToggles.tools || false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && attachments.length === 0) return
    
    const options: ChatOptions = {
      model: selectedModel,
      webSearch: webSearchEnabled,
      tools: toolsEnabled
    }
    
    onSubmit(input, mentions, attachments, options)
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
    
    const newValue = 
      beforeCursor.substring(0, lastAtIndex) + 
      `@${mention.name} ` + 
      afterCursor
    
    setInput(newValue)
    setMentions([...mentions, mention])
    setShowMentions(false)
    textareaRef.current?.focus()
  }

  const addAttachment = (file: File) => {
    const attachment: Attachment = {
      id: Date.now().toString(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    }
    setAttachments([...attachments, attachment])
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const filteredSuggestions = mentionSuggestions.filter(m =>
    m.name.toLowerCase().includes(mentionFilter.toLowerCase())
  )

  const getIcon = (mention: Mention) => {
    switch (mention.type) {
      case 'user': return <User className="h-3 w-3" />
      case 'agent': return <Bot className="h-3 w-3" />
      case 'channel': return <Hash className="h-3 w-3" />
    }
  }

  const getAttachmentIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  return (
    <div className={cn("w-full", className)}>
      {showStatus && (
        <AssistantStatusBar {...(statusProps || {})} className="mt-4" />
      )}
      
      <form 
        onSubmit={handleSubmit}
        className="flex w-full flex-col rounded-xl border shadow-xs transition-all"
      >
        {/* Controls */}
        {showControls && (
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1">
              <Toggle
                pressed={webSearchEnabled}
                onPressedChange={setWebSearchEnabled}
                size="sm"
                className="h-8"
              >
                <Globe className="h-4 w-4 mr-1" />
                Web Search
              </Toggle>
              
              <Toggle
                pressed={toolsEnabled}
                onPressedChange={setToolsEnabled}
                size="sm"
                className="h-8"
              >
                <Wrench className="h-4 w-4 mr-1" />
                Tools
              </Toggle>
            </div>
          </div>
        )}

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 border-b">
            {attachments.map(attachment => (
              <Badge 
                key={attachment.id} 
                variant="secondary"
                className="flex items-center gap-1.5 pr-1"
              >
                {getAttachmentIcon(attachment.type)}
                <span className="max-w-[150px] truncate">{attachment.name}</span>
                <span className="text-xs text-muted-foreground">({attachment.size})</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Input area */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className="flex min-h-[60px] w-full resize-none bg-transparent p-3 pr-20 transition-all placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            style={{ scrollbarWidth: 'none' }}
          />
          
          {/* Character count */}
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {input.length}/{maxLength}
          </div>
        </div>
        
        {/* Bottom controls */}
        <div className="flex items-center justify-between p-3 pt-0">
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
              <PopoverContent className="w-56 p-1" align="start">
                <div className="space-y-1">
                  {mentionSuggestions.map(mention => (
                    <button
                      key={mention.id}
                      onClick={() => insertMention(mention)}
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {getIcon(mention)}
                      <span>{mention.name}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="h-8 gap-1.5 px-3"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.multiple = true
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  if (files) {
                    Array.from(files).forEach(addAttachment)
                  }
                }
                input.click()
              }}
            >
              <Paperclip className="h-4 w-4" />
              Attach
            </Button>
          </div>
          
          <div className="flex gap-2">
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
      
      {/* Mention suggestions popup */}
      {showMentions && (
        <div className="absolute bottom-full mb-2 w-64 rounded-lg border bg-popover p-1 shadow-md">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1">
            Suggestions
          </div>
          {filteredSuggestions.map(mention => (
            <button
              key={mention.id}
              onClick={() => insertMention(mention)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {getIcon(mention)}
              <span>{mention.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}