import type { Meta, StoryObj } from '@storybook/react'
import { ChatHeader } from './ChatHeader'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Settings, Share } from 'lucide-react'

const meta = {
  title: 'Chat/ChatHeader',
  component: ChatHeader,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the header',
    },
    onSearchClick: {
      action: 'search clicked',
      description: 'Callback when search button is clicked',
    },
  },
} satisfies Meta<typeof ChatHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'React Component Development',
    onSearchClick: () => {},
  },
}

export const WithoutSearch: Story = {
  args: {
    title: 'New Chat',
  },
}

export const WithCustomActions: Story = {
  args: {
    title: 'Project Discussion',
    onSearchClick: () => {},
  },
  render: (args) => (
    <ChatHeader {...args}>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Share className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Settings className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </ChatHeader>
  ),
}

export const LongTitle: Story = {
  args: {
    title: 'This is a very long chat title that might need to be truncated in smaller screens',
    onSearchClick: () => {},
  },
}

export const MinimalHeader: Story = {
  args: {
    title: 'Chat',
  },
}

export const InContainer: Story = {
  args: {
    title: 'React Hooks Implementation',
    onSearchClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl mx-auto bg-background rounded-lg shadow-sm">
        <Story />
        <div className="p-4 border-t">
          <p className="text-muted-foreground">Chat content would go here...</p>
        </div>
      </div>
    ),
  ],
}