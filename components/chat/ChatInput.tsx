'use client'

import { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { ChatTextarea } from './ChatTextarea'
import { ChatAttachmentButton } from './ChatAttachmentButton'
import { ChatToggleGroup } from './ChatToggleGroup'
import { ChatModelSelector } from './ChatModelSelector'
import { ChatSubmitButton } from './ChatSubmitButton'

export interface ChatInputProps {
  onSubmit?: (message: string, options?: ChatSubmitOptions) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export interface ChatSubmitOptions {
  mode?: 'default' | 'deepsearch' | 'think'
  model?: string
  attachments?: File[]
}

export function ChatInput({
  onSubmit,
  placeholder = "Ask anything...",
  className,
  disabled = false
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState<'default' | 'deepsearch' | 'think'>('default')
  const [model, setModel] = useState('grok-3')
  const [attachments, setAttachments] = useState<File[]>([])

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!message.trim() || disabled) return

    onSubmit?.(message, {
      mode,
      model,
      attachments
    })

    setMessage('')
    setAttachments([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full relative",
        className
      )}
    >
      <div className={cn(
        "relative w-full overflow-hidden",
        "bg-background/95 backdrop-blur-sm",
        "ring-1 ring-border/50",
        "rounded-3xl",
        "shadow-lg shadow-black/5",
        "transition-all duration-200",
        "hover:ring-border/70",
        "focus-within:ring-border"
      )}>
        <div className="relative">
          <ChatTextarea
            value={message}
            onChange={setMessage}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
          />

          <div className="flex items-center gap-2 px-3 pb-3">
            <ChatAttachmentButton
              onAttach={(files) => setAttachments([...attachments, ...files])}
              disabled={disabled}
            />
            
            <div className="flex-1 flex items-center gap-2">
              <ChatToggleGroup
                mode={mode}
                onModeChange={setMode}
                disabled={disabled}
              />
              
              <ChatModelSelector
                model={model}
                onModelChange={setModel}
                disabled={disabled}
              />
            </div>

            <ChatSubmitButton
              onClick={() => handleSubmit()}
              disabled={disabled || !message.trim()}
            />
          </div>
        </div>

        {attachments.length > 0 && (
          <div className="px-3 pb-2 flex gap-2 flex-wrap">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="text-xs bg-muted px-2 py-1 rounded-full flex items-center gap-1"
              >
                <span className="truncate max-w-[100px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}