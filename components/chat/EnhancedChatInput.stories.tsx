import type { Meta, StoryObj } from '@storybook/react'
import { EnhancedChatInput } from './EnhancedChatInput'
import { useState } from 'react'

const meta = {
  title: 'Chat/EnhancedChatInput',
  component: EnhancedChatInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EnhancedChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Type a message...",
    onSubmit: (message, mentions, attachments) => {
      console.log('Message:', message)
      console.log('Mentions:', mentions)
      console.log('Attachments:', attachments)
    },
  },
}

export const WithCustomStatus: Story = {
  args: {
    placeholder: "Ask me anything...",
    statusText: "GPT-4 is thinking...",
    onSubmit: (message, mentions, attachments) => {
      console.log('Submitted:', { message, mentions, attachments })
    },
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Chat is disabled",
    disabled: true,
    statusText: "Assistant is offline",
    onSubmit: () => {},
  },
}

export const NoStatus: Story = {
  args: {
    placeholder: "Type your message here...",
    showStatus: false,
    onSubmit: (message, mentions, attachments) => {
      console.log('Submitted:', { message, mentions, attachments })
    },
  },
}

export const WithLongMessage: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <div>
        <EnhancedChatInput
          placeholder="Type a long message to see character count..."
          maxLength={500}
          onSubmit={(message, mentions, attachments) => {
            console.log('Submitted:', { message, mentions, attachments })
            setValue('')
          }}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Try typing a long message to see the character counter appear
        </p>
      </div>
    )
  },
}

export const InteractiveExample: Story = {
  render: () => {
    const [messages, setMessages] = useState<any[]>([])
    
    return (
      <div className="space-y-4">
        <div className="rounded-lg border p-4 min-h-[200px]">
          <h3 className="font-semibold mb-2">Messages</h3>
          {messages.length === 0 ? (
            <p className="text-muted-foreground">No messages yet. Try sending one!</p>
          ) : (
            <div className="space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className="p-2 bg-muted rounded">
                  <p className="text-sm">{msg.message}</p>
                  {msg.mentions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">Mentions:</span>
                      {msg.mentions.map((m: any) => (
                        <span key={m.id} className="text-xs bg-primary/20 px-1 rounded">
                          @{m.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {msg.attachments.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">Attachments:</span>
                      {msg.attachments.map((a: any) => (
                        <span key={a.id} className="text-xs bg-secondary px-1 rounded">
                          {a.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <EnhancedChatInput
          placeholder="Try @mentions and file attachments..."
          onSubmit={(message, mentions, attachments) => {
            setMessages([...messages, { message, mentions, attachments }])
          }}
        />
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Type @ to see mention suggestions</p>
          <p>• Click "Attach" to add files</p>
          <p>• Press Enter to send (Shift+Enter for new line)</p>
        </div>
      </div>
    )
  },
}

export const WithPrefilledData: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This example shows the input with some pre-attached files
        </p>
        <EnhancedChatInput
          placeholder="Add your message..."
          onSubmit={(message, mentions, attachments) => {
            console.log('Submitted:', { message, mentions, attachments })
          }}
        />
        <p className="text-sm text-muted-foreground">
          Note: In a real implementation, you would pass initial attachments as a prop
        </p>
      </div>
    )
  },
}