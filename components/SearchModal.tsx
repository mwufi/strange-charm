"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  Search, 
  FileText, 
  MessageSquare, 
  Clock, 
  Star,
  FolderOpen,
  Hash,
  Bot,
  ArrowRight,
  Command
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface SearchResult {
  id: string
  type: 'chat' | 'file' | 'project' | 'agent' | 'command'
  title: string
  subtitle?: string
  icon?: React.ReactNode
  timestamp?: Date
  starred?: boolean
  action?: () => void
}

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect?: (result: SearchResult) => void
}

// Sample search results
const sampleResults: SearchResult[] = [
  {
    id: '1',
    type: 'chat',
    title: 'React hooks implementation discussion',
    subtitle: 'with Code Assistant',
    icon: <MessageSquare className="h-4 w-4" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    starred: true,
  },
  {
    id: '2',
    type: 'file',
    title: 'components/chat/ChatInput.tsx',
    subtitle: 'TypeScript React Component',
    icon: <FileText className="h-4 w-4" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '3',
    type: 'project',
    title: 'Ara Assistant',
    subtitle: '42 files, 15 conversations',
    icon: <FolderOpen className="h-4 w-4" />,
  },
  {
    id: '4',
    type: 'agent',
    title: 'Research Agent',
    subtitle: 'Search and analyze information',
    icon: <Bot className="h-4 w-4" />,
  },
  {
    id: '5',
    type: 'command',
    title: 'Create new project',
    subtitle: 'Start a new project with AI assistance',
    icon: <Command className="h-4 w-4" />,
  },
]

const recentSearches = [
  'useState hook',
  'authentication flow',
  'database schema',
  'API integration',
]

export function SearchModal({ open, onOpenChange, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filter results based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = sampleResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => (i + 1) % Math.max(1, results.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => (i - 1 + Math.max(1, results.length)) % Math.max(1, results.length))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelect(results[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex])

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result)
    result.action?.()
    onOpenChange(false)
    setQuery('')
  }

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'chat': return 'text-blue-500 bg-blue-500/10'
      case 'file': return 'text-green-500 bg-green-500/10'
      case 'project': return 'text-purple-500 bg-purple-500/10'
      case 'agent': return 'text-orange-500 bg-orange-500/10'
      case 'command': return 'text-pink-500 bg-pink-500/10'
      default: return 'text-muted-foreground bg-muted'
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Search Input */}
        <div className="border-b">
          <div className="flex items-center px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats, files, projects..."
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>
        </div>

        {/* Results or Recent */}
        <div className="max-h-[400px] overflow-y-auto">
          {query.trim() ? (
            results.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  Results
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      "w-full px-4 py-2.5 flex items-center gap-3 hover:bg-accent transition-colors",
                      selectedIndex === index && "bg-accent"
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md",
                      getTypeColor(result.type)
                    )}>
                      {result.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.title}</span>
                        {result.starred && <Star className="h-3 w-3 fill-current text-yellow-500" />}
                      </div>
                      {result.subtitle && (
                        <div className="text-sm text-muted-foreground">{result.subtitle}</div>
                      )}
                    </div>
                    {result.timestamp && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(result.timestamp)}
                      </div>
                    )}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No results found for "{query}"
              </div>
            )
          ) : (
            <>
              {/* Recent Searches */}
              <div className="py-2">
                <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className="w-full px-4 py-2 flex items-center gap-3 hover:bg-accent transition-colors text-left"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="py-2 border-t">
                <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  Quick Actions
                </div>
                <button
                  onClick={() => {
                    onOpenChange(false)
                    // Navigate to new chat
                  }}
                  className="w-full px-4 py-2 flex items-center gap-3 hover:bg-accent transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Start new chat</span>
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>N
                  </kbd>
                </button>
                <button
                  onClick={() => {
                    onOpenChange(false)
                    // Navigate to projects
                  }}
                  className="w-full px-4 py-2 flex items-center gap-3 hover:bg-accent transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
                    <FolderOpen className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Browse projects</span>
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>P
                  </kbd>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                ↵
              </kbd>
              Select
            </span>
          </div>
          <span>Type to search</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}