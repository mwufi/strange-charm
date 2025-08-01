import type { Meta, StoryObj } from '@storybook/react'
import { UserMessage } from './UserMessage'

const meta = {
  title: 'Chat/UserMessage',
  component: UserMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    timestamp: {
      control: 'date',
    },
  },
} satisfies Meta<typeof UserMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'Can you help me understand how React hooks work?',
    timestamp: new Date(),
  },
}

export const ShortMessage: Story = {
  args: {
    content: 'Hello!',
    timestamp: new Date(),
  },
}

export const LongMessage: Story = {
  args: {
    content: `I'm working on a React application and need help with state management. 

The app has the following requirements:
- User authentication with role-based permissions
- Real-time data updates from a WebSocket connection
- Complex form handling with validation
- Offline capability with data synchronization

What would be the best approach for managing state in this scenario? Should I use Redux, Context API, or something else?`,
    timestamp: new Date(),
  },
}

export const MultipleQuestions: Story = {
  args: {
    content: `tell me more about how to do big things

What's the most impactful thing you can do today?
11am-8pm

The goal you're working for this year`,
    timestamp: new Date(),
  },
}

export const CodeInMessage: Story = {
  args: {
    content: `I'm getting this error when running my code:

TypeError: Cannot read property 'map' of undefined
  at UserList (UserList.jsx:15:20)

Here's my component:
const users = await fetchUsers();
return <div>{users.map(u => <User key={u.id} {...u} />)}</div>

What's wrong?`,
    timestamp: new Date(),
  },
}