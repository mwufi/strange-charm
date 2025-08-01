import type { Meta, StoryObj } from '@storybook/react'
import { ChatInput } from './ChatInput'

const meta = {
  title: 'Chat/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    showControls: {
      control: 'boolean',
      description: 'Show model selection and toggles'
    },
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

export const WithControls: Story = {
  args: {
    placeholder: 'Type a message...',
    showControls: true,
  },
}

export const FullFeatured: Story = {
  args: {
    placeholder: 'Type a message...',
    showControls: true,
    showStatus: true,
    defaultToggles: {
      webSearch: true,
      tools: false
    }
  },
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
    showControls: true,
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
  render: () => (
    <div className="flex flex-col h-[600px] bg-background rounded-lg border">
      <div className="flex-1 p-4">
        <p className="text-muted-foreground">Chat messages would appear here...</p>
      </div>
      <div className="border-t">
        <div className="px-4">
          <ChatInput 
            onSubmit={(message, mentions, attachments, options) => {
              console.log('Message:', message)
              console.log('Options:', options)
            }}
            showControls
            showStatus
            placeholder="Ask anything..."
          />
        </div>
      </div>
    </div>
  ),
}