'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChatToggleGroupProps {
  mode: 'default' | 'deepsearch' | 'think'
  onModeChange: (mode: 'default' | 'deepsearch' | 'think') => void
  disabled?: boolean
}

export function ChatToggleGroup({ mode, onModeChange, disabled }: ChatToggleGroupProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant={mode === 'deepsearch' ? 'default' : 'outline'}
        size="sm"
        disabled={disabled}
        onClick={() => onModeChange(mode === 'deepsearch' ? 'default' : 'deepsearch')}
        className={cn(
          "h-8 px-3 rounded-full font-normal",
          "transition-all duration-200",
          mode === 'deepsearch' && "bg-primary/10 text-primary hover:bg-primary/20"
        )}
      >
        <DeepSearchIcon className="w-4 h-4 mr-1.5" />
        <span className="text-sm">DeepSearch</span>
      </Button>

      <Button
        type="button"
        variant={mode === 'think' ? 'default' : 'outline'}
        size="sm"
        disabled={disabled}
        onClick={() => onModeChange(mode === 'think' ? 'default' : 'think')}
        className={cn(
          "h-8 px-3 rounded-full font-normal",
          "transition-all duration-200",
          mode === 'think' && "bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400"
        )}
      >
        <ThinkIcon className="w-4 h-4 mr-1.5" />
        <span className="text-sm">Think</span>
      </Button>
    </div>
  )
}

function DeepSearchIcon({ className }: { className?: string }) {
  return (
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.2987 8.84667C15.3929 1.86808 5.44409 5.76837 7.08971 11.9099C8.01826 15.3753 12.8142 14.8641 13.2764 12.8592C13.6241 11.3504 10.2964 12.3528 10.644 10.844C11.1063 8.839 15.9022 8.32774 16.8307 11.793C18.5527 18.2196 7.86594 22.4049 4.71987 15.2225"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ThinkIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 9C19 12.866 15.866 17 12 17C8.13398 17 4.99997 12.866 4.99997 9C4.99997 5.13401 8.13398 3 12 3C15.866 3 19 5.13401 19 9Z"
        className="fill-yellow-100 dark:fill-yellow-900/30"
      />
      <path
        d="M15 16.1378L14.487 15.2794L14 15.5705V16.1378H15ZM8.99997 16.1378H9.99997V15.5705L9.51293 15.2794L8.99997 16.1378ZM18 9C18 11.4496 16.5421 14.0513 14.487 15.2794L15.5129 16.9963C18.1877 15.3979 20 12.1352 20 9H18ZM12 4C13.7598 4 15.2728 4.48657 16.3238 5.33011C17.3509 6.15455 18 7.36618 18 9H20C20 6.76783 19.082 4.97946 17.5757 3.77039C16.0931 2.58044 14.1061 2 12 2V4ZM5.99997 9C5.99997 7.36618 6.64903 6.15455 7.67617 5.33011C8.72714 4.48657 10.2401 4 12 4V2C9.89382 2 7.90681 2.58044 6.42427 3.77039C4.91791 4.97946 3.99997 6.76783 3.99997 9H5.99997ZM9.51293 15.2794C7.4578 14.0513 5.99997 11.4496 5.99997 9H3.99997C3.99997 12.1352 5.81225 15.3979 8.48701 16.9963L9.51293 15.2794ZM9.99997 19.5001V16.1378H7.99997V19.5001H9.99997ZM10.5 20.0001C10.2238 20.0001 9.99997 19.7763 9.99997 19.5001H7.99997C7.99997 20.8808 9.11926 22.0001 10.5 22.0001V20.0001ZM13.5 20.0001H10.5V22.0001H13.5V20.0001ZM14 19.5001C14 19.7763 13.7761 20.0001 13.5 20.0001V22.0001C14.8807 22.0001 16 20.8808 16 19.5001H14ZM14 16.1378V19.5001H16V16.1378H14Z"
        fill="currentColor"
      />
      <path d="M9 16.0001H15" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}