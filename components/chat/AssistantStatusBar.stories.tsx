import type { Meta, StoryObj } from '@storybook/react'
import { AssistantStatusBar } from './AssistantStatusBar'

const meta = {
  title: 'Chat/AssistantStatusBar',
  component: AssistantStatusBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssistantStatusBar>

export default meta
type Story = StoryObj<typeof meta>

export const Ready: Story = {
  args: {
    status: 'ready',
  },
}

export const Thinking: Story = {
  args: {
    status: 'thinking',
  },
}

export const Typing: Story = {
  args: {
    status: 'typing',
  },
}

export const Error: Story = {
  args: {
    status: 'error',
  },
}

export const CustomMessage: Story = {
  args: {
    status: 'ready',
    message: 'Claude 3.5 Sonnet is ready to help',
  },
}

export const InContext: Story = {
  render: () => (
    <div className="rounded-xl border shadow-sm">
      <AssistantStatusBar status="ready" />
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Chat input would go here...</p>
      </div>
    </div>
  ),
}