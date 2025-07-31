'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Search, 
  FileText, 
  Terminal, 
  Globe, 
  Database,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolUseProps {
  toolName: string
  status: 'pending' | 'running' | 'completed' | 'error'
  parameters?: Record<string, any>
  result?: any
  error?: string
  className?: string
}

const toolIcons: Record<string, any> = {
  'web_search': Globe,
  'code_interpreter': Code,
  'file_reader': FileText,
  'terminal': Terminal,
  'database_query': Database,
  'api_call': Globe
}

export function ToolUse({
  toolName,
  status,
  parameters,
  result,
  error,
  className
}: ToolUseProps) {
  const Icon = toolIcons[toolName] || Terminal
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border bg-muted/30 p-3",
        status === 'error' && "border-destructive/50",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-8 h-8 rounded-md flex items-center justify-center",
          "bg-background shadow-sm"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium">{toolName.replace(/_/g, ' ')}</h4>
            {status === 'running' && (
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
            )}
            {status === 'completed' && (
              <CheckCircle className="w-3 h-3 text-green-600" />
            )}
            {status === 'error' && (
              <XCircle className="w-3 h-3 text-destructive" />
            )}
          </div>

          {parameters && Object.keys(parameters).length > 0 && (
            <div className="mb-2">
              <details className="group">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  Parameters
                </summary>
                <pre className="mt-1 text-xs bg-background/50 rounded p-2 overflow-x-auto">
                  {JSON.stringify(parameters, null, 2)}
                </pre>
              </details>
            </div>
          )}

          {status === 'completed' && result && (
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">Result:</p>
              <div className="text-xs bg-background/50 rounded p-2 max-h-32 overflow-y-auto">
                {typeof result === 'string' ? (
                  <p className="whitespace-pre-wrap">{result}</p>
                ) : (
                  <pre className="overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}

          {status === 'error' && error && (
            <div className="mt-2">
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}