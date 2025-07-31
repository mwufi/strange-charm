'use client'

import { motion } from 'framer-motion'
import { Bot, Search, Zap, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentCardProps {
  agentName: string
  status: 'waiting' | 'thinking' | 'searching' | 'completed' | 'error'
  description?: string
  progress?: number
  searchQueries?: string[]
  results?: string
  className?: string
}

const statusConfig = {
  waiting: {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100 dark:bg-gray-900',
    label: 'Waiting to start'
  },
  thinking: {
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    label: 'Thinking...'
  },
  searching: {
    icon: Search,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    label: 'Searching...'
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    label: 'Completed'
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    label: 'Error'
  }
}

export function AgentCard({
  agentName,
  status,
  description,
  progress,
  searchQueries,
  results,
  className
}: AgentCardProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border border-border/50 overflow-hidden",
        config.bgColor,
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-background/80 shadow-sm"
          )}>
            <Bot className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm">{agentName}</h3>
              <div className={cn("flex items-center gap-1", config.color)}>
                <StatusIcon className="w-4 h-4" />
                <span className="text-xs">{config.label}</span>
              </div>
            </div>
            
            {description && (
              <p className="text-sm text-muted-foreground mb-3">{description}</p>
            )}

            {progress !== undefined && status !== 'completed' && (
              <div className="mb-3">
                <div className="w-full bg-background/50 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary h-1.5 rounded-full"
                  />
                </div>
              </div>
            )}

            {searchQueries && searchQueries.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium mb-1.5">Search queries:</p>
                <div className="space-y-1">
                  {searchQueries.map((query, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Search className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{query}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {results && (
              <div className="bg-background/50 rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Results</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">{results}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}