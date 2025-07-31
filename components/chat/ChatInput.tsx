'use client'

import { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { ChatTextarea } from './ChatTextarea'
import { ChatAttachmentButton } from './ChatAttachmentButton'
import { ChatToggleGroup } from './ChatToggleGroup'
import { ChatModelSelector } from './ChatModelSelector'
import { ChatSubmitButton } from './ChatSubmitButton'
import { AttachedFiles } from './AttachedFiles'

export interface ChatInputProps {
  onSubmit?: (message: string, options?: ChatSubmitOptions) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  attachmentPosition?: 'top' | 'bottom'
}

export interface ChatSubmitOptions {
  mode?: 'default' | 'deepsearch' | 'think'
  model?: string
  attachments?: File[]
}

interface AttachedFile {
  id: string
  file: File
}

export function ChatInput({
  onSubmit,
  placeholder = "Ask anything...",
  className,
  disabled = false,
  attachmentPosition = 'bottom'
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState<'default' | 'deepsearch' | 'think'>('default')
  const [model, setModel] = useState('grok-3')
  const [attachments, setAttachments] = useState<AttachedFile[]>([])

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!message.trim() || disabled) return

    onSubmit?.(message, {
      mode,
      model,
      attachments: attachments.map(a => a.file)
    })

    setMessage('')
    setAttachments([])
  }

  const handleAttach = (files: File[]) => {
    const newAttachments = files.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file
    }))
    setAttachments([...attachments, ...newAttachments])
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id))
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
        {attachmentPosition === 'top' && (
          <AttachedFiles
            files={attachments}
            onRemove={handleRemoveAttachment}
            position="top"
          />
        )}

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
              onAttach={handleAttach}
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

        {attachmentPosition === 'bottom' && (
          <AttachedFiles
            files={attachments}
            onRemove={handleRemoveAttachment}
            position="bottom"
          />
        )}
      </div>
    </form>
  )
}