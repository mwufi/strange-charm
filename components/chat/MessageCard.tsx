"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Code, 
  Image, 
  Link2, 
  Download, 
  ExternalLink,
  Copy,
  Check,
  FileJson,
  FileCode,
  Globe,
  ChevronRight,
  Play,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Base card props
interface BaseCardProps {
  className?: string
}

// File Card
interface FileCardProps extends BaseCardProps {
  fileName: string
  fileSize?: string
  fileType?: string
  downloadUrl?: string
  preview?: string
}

export function FileCard({ 
  fileName, 
  fileSize, 
  fileType = 'text', 
  downloadUrl,
  preview,
  className 
}: FileCardProps) {
  const getFileIcon = () => {
    if (fileType.includes('code') || fileType.includes('javascript') || fileType.includes('typescript')) {
      return <FileCode className="h-6 w-6" />
    }
    if (fileType.includes('json')) {
      return <FileJson className="h-6 w-6" />
    }
    if (fileType.includes('image')) {
      return <Image className="h-6 w-6" />
    }
    return <FileText className="h-6 w-6" />
  }

  return (
    <div className={cn(
      "flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50",
      className
    )}>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {getFileIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{fileName}</p>
        {fileSize && <p className="text-sm text-muted-foreground">{fileSize}</p>}
      </div>
      {downloadUrl && (
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

// Code Card with syntax highlighting preview
interface CodeCardProps extends BaseCardProps {
  language: string
  code: string
  fileName?: string
  showLineNumbers?: boolean
}

export function CodeCard({ 
  language, 
  code, 
  fileName,
  showLineNumbers = true,
  className 
}: CodeCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n').slice(0, 10) // Show first 10 lines

  return (
    <div className={cn("rounded-lg border bg-muted/50 overflow-hidden", className)}>
      {fileName && (
        <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      <pre className="p-4 text-sm overflow-x-auto">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="mr-4 text-muted-foreground select-none">
                  {String(i + 1).padStart(2, ' ')}
                </span>
              )}
              <span>{line}</span>
            </div>
          ))}
          {code.split('\n').length > 10 && (
            <div className="text-muted-foreground mt-2">... +{code.split('\n').length - 10} more lines</div>
          )}
        </code>
      </pre>
    </div>
  )
}

// Link Preview Card
interface LinkCardProps extends BaseCardProps {
  url: string
  title: string
  description?: string
  imageUrl?: string
  domain?: string
}

export function LinkCard({ 
  url, 
  title, 
  description, 
  imageUrl,
  domain,
  className 
}: LinkCardProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "flex gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50 no-underline",
        className
      )}
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title}
          className="h-20 w-20 rounded object-cover shrink-0"
        />
      ) : (
        <div className="flex size-20 shrink-0 items-center justify-center rounded bg-muted">
          <Globe className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-foreground line-clamp-1">{title}</p>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
            )}
            {domain && (
              <p className="text-xs text-muted-foreground mt-2">{domain}</p>
            )}
          </div>
          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </div>
    </a>
  )
}

// Action Card (for suggestions, follow-ups)
interface ActionCardProps extends BaseCardProps {
  title: string
  description?: string
  actions: Array<{
    label: string
    icon?: React.ReactNode
    onClick?: () => void
  }>
}

export function ActionCard({ 
  title, 
  description,
  actions,
  className 
}: ActionCardProps) {
  return (
    <div className={cn(
      "rounded-lg border bg-card p-4",
      className
    )}>
      <div className="mb-4">
        <h4 className="font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          {title}
        </h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            onClick={action.onClick}
            className="gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

// Tool Use Card (for showing when assistant uses tools)
interface ToolUseCardProps extends BaseCardProps {
  toolName: string
  status: 'running' | 'completed' | 'failed'
  description?: string
  result?: string
}

export function ToolUseCard({ 
  toolName, 
  status,
  description,
  result,
  className 
}: ToolUseCardProps) {
  return (
    <div className={cn(
      "rounded-lg border bg-muted/30 p-3",
      className
    )}>
      <div className="flex items-center gap-2">
        <div className={cn(
          "size-2 rounded-full",
          status === 'running' && "bg-blue-500 animate-pulse",
          status === 'completed' && "bg-green-500",
          status === 'failed' && "bg-red-500"
        )} />
        <span className="text-sm font-medium">{toolName}</span>
        {status === 'running' && (
          <span className="text-xs text-muted-foreground">Running...</span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
      {result && status === 'completed' && (
        <div className="mt-2 text-sm">
          <pre className="bg-muted rounded p-2 overflow-x-auto">{result}</pre>
        </div>
      )}
    </div>
  )
}