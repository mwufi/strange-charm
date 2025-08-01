"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Copy, 
  ChevronDown, 
  ChevronUp,
  History,
  Check
} from 'lucide-react'
import { format } from 'date-fns'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface AssistantMessageProps {
  content: string
  timestamp: Date
  assistantName?: string
  avatarUrl?: string
  reasoning?: string
  showThinking?: boolean
  className?: string
}

export function AssistantMessage({
  content,
  timestamp,
  assistantName = "Assistant",
  avatarUrl = "/logo.svg",
  reasoning,
  showThinking = false,
  className
}: AssistantMessageProps) {
  const [isReasoningOpen, setIsReasoningOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group mt-4 flex w-full gap-4", className)}>
      {/* Avatar */}
      <div className="flex size-6 shrink-0 items-center justify-center">
        <img 
          alt={assistantName} 
          src={avatarUrl} 
          className="opacity-90"
          width={24}
          height={20}
        />
      </div>

      {/* Content */}
      <div className="flex w-full min-w-0 flex-col gap-2">
        {/* Header with reasoning toggle */}
        {reasoning && showThinking && (
          <Collapsible open={isReasoningOpen} onOpenChange={setIsReasoningOpen}>
            <div className="flex items-start justify-between gap-4">
              <CollapsibleTrigger asChild>
                <button className="flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <span className="flex items-center font-medium">
                    <span>{assistantName}</span>
                  </span>
                  {isReasoningOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </CollapsibleTrigger>
              <div className="flex items-center transition-opacity opacity-100">
                <span className="mr-2 text-xs text-muted-foreground">
                  {format(timestamp, 'h:mm:ss a')}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-muted-foreground"
                  onClick={() => copyToClipboard(content)}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <History className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CollapsibleContent>
              <div className="mt-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                <div className="font-medium mb-1">Thinking...</div>
                <div className="space-y-2 opacity-90 prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>
                    {reasoning}
                  </ReactMarkdown>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Regular header without reasoning */}
        {!reasoning && (
          <div className="flex items-start justify-between gap-4">
            <div className="flex cursor-pointer items-center gap-2 text-muted-foreground">
              <span className="flex items-center font-medium">
                <span>{assistantName}</span>
              </span>
            </div>
            <div className="flex items-center transition-opacity opacity-100">
              <span className="mr-2 text-xs text-muted-foreground">
                {format(timestamp, 'h:mm:ss a')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground"
                onClick={() => copyToClipboard(content)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Message content */}
        <div className="font-medium text-foreground/70 prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          <ReactMarkdown 
            components={{
              // Custom code block rendering
              pre: ({ children, ...props }) => (
                <pre className="overflow-x-auto rounded-lg bg-muted p-4" {...props}>
                  {children}
                </pre>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="rounded bg-muted px-1 py-0.5" {...props}>
                    {children}
                  </code>
                )
              },
              // Links open in new tab
              a: ({ children, ...props }) => (
                <a target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props}>
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}