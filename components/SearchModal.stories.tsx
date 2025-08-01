import type { Meta, StoryObj } from '@storybook/react'
import { SearchModal } from './SearchModal'
import { useState } from 'react'
import { Button } from './ui/button'

const meta = {
  title: 'UI/SearchModal',
  component: SearchModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open Search (⌘K)
        </Button>
        <SearchModal 
          open={open} 
          onOpenChange={setOpen}
          onSelect={(result) => {
            console.log('Selected:', result)
          }}
        />
      </>
    )
  },
}

export const AlwaysOpen: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const InteractiveExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [lastSelected, setLastSelected] = useState<any>(null)
    
    // Keyboard shortcut
    useState(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault()
          setOpen(true)
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    })
    
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Search Everything</h2>
          <p className="text-muted-foreground">
            Press <kbd className="px-2 py-1 text-xs border rounded">⌘K</kbd> or click the button below
          </p>
          <Button onClick={() => setOpen(true)} size="lg">
            Open Search Modal
          </Button>
        </div>
        
        {lastSelected && (
          <div className="p-4 rounded-lg border bg-muted/50 max-w-md">
            <p className="text-sm font-medium mb-2">Last selected:</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Type:</span> {lastSelected.type}</p>
              <p><span className="text-muted-foreground">Title:</span> {lastSelected.title}</p>
              {lastSelected.subtitle && (
                <p><span className="text-muted-foreground">Subtitle:</span> {lastSelected.subtitle}</p>
              )}
            </div>
          </div>
        )}
        
        <SearchModal 
          open={open} 
          onOpenChange={setOpen}
          onSelect={(result) => {
            setLastSelected(result)
            console.log('Selected:', result)
          }}
        />
      </div>
    )
  },
}

export const CustomUsage: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Search with History Tracking</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This example tracks what items you select
          </p>
          <Button onClick={() => setOpen(true)}>
            Open Search
          </Button>
        </div>
        
        {searchHistory.length > 0 && (
          <div className="p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Selection History</h4>
            <ul className="space-y-1">
              {searchHistory.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  {i + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <SearchModal 
          open={open} 
          onOpenChange={setOpen}
          onSelect={(result) => {
            setSearchHistory([...searchHistory, result.title])
          }}
        />
      </div>
    )
  },
}

export const SearchStates: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Search Result Types</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 9h6M9 12h6M9 15h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Chat Conversation</p>
                  <p className="text-sm text-muted-foreground">Previous chat history</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 text-green-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">File</p>
                  <p className="text-sm text-muted-foreground">Code files and documents</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Project</p>
                  <p className="text-sm text-muted-foreground">Your projects and workspaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}