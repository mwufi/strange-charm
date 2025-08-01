import type { Meta, StoryObj } from '@storybook/react'
import { ChatInput } from './ChatInput'
import { useState } from 'react'

const meta = {
  title: 'Chat/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    showStatus: {
      control: 'boolean',
      description: 'Show assistant status bar'
    }
  },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type a message...',
  },
}

export const WithStatus: Story = {
  args: {
    placeholder: 'Type a message...',
    showStatus: true,
  },
}

export const WithAgentMode: Story = {
  render: () => {
    const [messages, setMessages] = useState<string[]>([])
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Agent mode selected - AI will use advanced reasoning
        </div>
        <ChatInput
          placeholder="Chat with agent mode"
          onSubmit={(message, mentions, attachments, options) => {
            console.log('Submitted with options:', options)
            setMessages([...messages, `Mode: ${options?.mode}, Model: ${options?.model}`])
          }}
        />
        {messages.map((msg, i) => (
          <div key={i} className="text-xs text-muted-foreground">{msg}</div>
        ))}
      </div>
    )
  }
}

export const WithResearchMode: Story = {
  render: () => {
    const [messages, setMessages] = useState<string[]>([])
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Deep research mode with source selection - try toggling different sources
        </div>
        <ChatInput
          placeholder="Get a detailed report"
          showStatus
          onSubmit={(message, mentions, attachments, options) => {
            console.log('Research with tools:', options?.tools)
            setMessages([...messages, `Research tools: ${options?.tools?.join(', ') || 'none'}`])
          }}
        />
        {messages.map((msg, i) => (
          <div key={i} className="text-xs text-muted-foreground">{msg}</div>
        ))}
      </div>
    )
  }
}

export const CustomStatus: Story = {
  args: {
    placeholder: 'Type a message...',
    showStatus: true,
    statusProps: {
      status: 'thinking',
      message: 'Claude is analyzing your code...'
    }
  },
}

export const WithCustomModels: Story = {
  args: {
    placeholder: 'Type a message...',
    models: [
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-3.5', label: 'GPT-3.5 Turbo' },
      { value: 'claude-2', label: 'Claude 2' },
    ],
    defaultModel: 'gpt-4'
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Chat is disabled...',
    disabled: true,
    showStatus: true,
    statusProps: {
      status: 'error',
      message: 'Connection lost'
    }
  },
}

export const InChatContext: Story = {
  render: () => {
    const [messages, setMessages] = useState<any[]>([])
    
    return (
      <div className="flex flex-col h-[600px] bg-background rounded-lg border">
        <div className="flex-1 p-4 overflow-auto">
          {messages.length === 0 ? (
            <p className="text-muted-foreground">Chat messages would appear here...</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-sm font-medium">Message: {msg.message}</div>
                  <div className="text-xs text-muted-foreground">
                    Mode: {msg.options?.mode || 'default'}, 
                    Model: {msg.options?.model}, 
                    Tools: {msg.options?.tools?.join(', ') || 'none'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t">
          <div className="px-4">
            <ChatInput 
              onSubmit={(message, mentions, attachments, options) => {
                console.log('Message:', message)
                console.log('Options:', options)
                setMessages([...messages, { message, options }])
              }}
              showStatus
              placeholder="Ask anything..."
            />
          </div>
        </div>
      </div>
    )
  }
}

export const AllToolModes: Story = {
  render: () => {
    const [selectedMode, setSelectedMode] = useState<string>()
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Click the Tools dropdown to see all available modes:
          <ul className="mt-2 ml-4 list-disc">
            <li>Agent mode (NEW) - Advanced AI reasoning</li>
            <li>Deep research - With source selection</li>
            <li>Create image - Generate images</li>
            <li>Study and learn - Educational assistance</li>
            <li>Web search - Search the internet</li>
            <li>Canvas - Creative workspace</li>
          </ul>
        </div>
        <ChatInput
          placeholder="Type a message..."
          onSubmit={(message, mentions, attachments, options) => {
            console.log('Submitted:', { message, options })
            setSelectedMode(options?.mode || 'none')
          }}
        />
        {selectedMode && (
          <div className="text-sm text-green-600">
            Last submission used: {selectedMode} mode
          </div>
        )}
      </div>
    )
  }
}

export const WithAttachments: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Click the + button to simulate adding attachments
      </div>
      <ChatInput
        placeholder="Type a message or attach files..."
        onSubmit={(message, mentions, attachments) => {
          console.log('Message:', message)
          console.log('Attachments:', attachments)
        }}
      />
    </div>
  )
}