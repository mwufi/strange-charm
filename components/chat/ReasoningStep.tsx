'use client'

import { motion } from 'framer-motion'
import { Brain, ChevronRight, Lightbulb, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReasoningStepProps {
  type: 'thinking' | 'analysis' | 'conclusion' | 'warning'
  content: string
  isActive?: boolean
  className?: string
}

const typeConfig = {
  thinking: {
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    label: 'Thinking'
  },
  analysis: {
    icon: ChevronRight,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
    label: 'Analyzing'
  },
  conclusion: {
    icon: Lightbulb,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
    label: 'Conclusion'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
    label: 'Note'
  }
}

export function ReasoningStep({
  type,
  content,
  isActive = false,
  className
}: ReasoningStepProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative pl-8",
        className
      )}
    >
      <div className={cn(
        "absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center",
        config.bgColor,
        isActive && "ring-2 ring-offset-2 ring-offset-background",
        isActive && type === 'thinking' && "ring-blue-500",
        isActive && type === 'analysis' && "ring-purple-500",
        isActive && type === 'conclusion' && "ring-yellow-500",
        isActive && type === 'warning' && "ring-orange-500"
      )}>
        <Icon className={cn("w-3.5 h-3.5", config.color)} />
      </div>

      <div className={cn(
        "ml-2 pb-4",
        "border-l-2 border-muted pl-4",
        "-mt-3 pt-3"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("text-xs font-medium", config.color)}>
            {config.label}
          </span>
          {isActive && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-current"
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {content}
        </p>
      </div>
    </motion.div>
  )
}

interface ReasoningChainProps {
  steps: Array<{
    type: 'thinking' | 'analysis' | 'conclusion' | 'warning'
    content: string
  }>
  activeStep?: number
  className?: string
}

export function ReasoningChain({ steps, activeStep, className }: ReasoningChainProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => (
        <ReasoningStep
          key={index}
          type={step.type}
          content={step.content}
          isActive={activeStep === index}
        />
      ))}
    </div>
  )
}