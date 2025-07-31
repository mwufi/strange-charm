'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ChatModelSelectorProps {
  model: string
  onModelChange: (model: string) => void
  disabled?: boolean
}

const models = [
  { value: 'grok-4-heavy', label: 'Grok 4 Heavy', badge: 'Expert' },
  { value: 'grok-3', label: 'Grok 3', badge: 'Fast' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus', badge: 'Creative' },
  { value: 'gpt-4', label: 'GPT-4', badge: 'Versatile' },
]

export function ChatModelSelector({ model, onModelChange, disabled }: ChatModelSelectorProps) {
  return (
    <Select value={model} onValueChange={onModelChange} disabled={disabled}>
      <SelectTrigger className="h-8 w-auto gap-1 border-0 px-3 font-normal focus:ring-0 bg-muted/50 hover:bg-muted">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-[200px]">
        {models.map((m) => (
          <SelectItem key={m.value} value={m.value} className="flex items-center justify-between">
            <span>{m.label}</span>
            {m.badge && (
              <span className="ml-2 text-xs text-muted-foreground">{m.badge}</span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}