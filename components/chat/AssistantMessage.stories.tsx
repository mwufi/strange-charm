import type { Meta, StoryObj } from '@storybook/react'
import { AssistantMessage } from './AssistantMessage'

const meta = {
  title: 'Chat/AssistantMessage',
  component: AssistantMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    timestamp: {
      control: 'date',
    },
  },
} satisfies Meta<typeof AssistantMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'Hello! I can help you with various tasks. What would you like to work on today?',
    timestamp: new Date(),
  },
}

export const WithReasoning: Story = {
  args: {
    content: `Based on my analysis, I recommend using React Context for your state management needs. It's built into React and perfect for your use case.`,
    timestamp: new Date(),
    reasoning: `The user is asking about state management for a small to medium React application. Let me consider the options:

1. **Redux**: Might be overkill for their needs
2. **Context API**: Built-in, simple, perfect for their scale
3. **Zustand**: Good alternative but adds a dependency

Since they mentioned it's a small app with just user authentication and theme state, Context API would be the most appropriate choice.`,
    showThinking: true,
  },
}

export const MarkdownContent: Story = {
  args: {
    content: `# Understanding React Hooks

React Hooks are functions that let you use state and other React features in functional components.

## Common Hooks

1. **useState** - Manages local state
2. **useEffect** - Handles side effects
3. **useContext** - Consumes context values

### Example Code

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

> **Note**: Hooks must be called at the top level of your component.

Learn more at [React Documentation](https://react.dev/learn/state-a-components-memory)`,
    timestamp: new Date(),
  },
}

export const LongReasoning: Story = {
  args: {
    content: 'I\'ve created a comprehensive goal-setting system tailored to your needs.',
    timestamp: new Date(),
    reasoning: `The user wants to build a company focused on personal AI assistants and has a goal of making $10M as a startup. They struggle with focus and want a digital system they can review in 30-60 minutes.

Let me design a system that:
1. Connects daily actions to the $10M goal
2. Solves the focus problem through clear prioritization
3. Can be reviewed quickly each week

I'll structure this around:
- The "One Thing" methodology for focus
- OKRs for goal alignment
- Weekly/daily tracking templates
- Milestone breakdowns for the $10M target`,
    showThinking: true,
  },
}

export const CodeExample: Story = {
  args: {
    content: `Here's how to implement a debounce function in TypeScript:

\`\`\`typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Usage example
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);
\`\`\`

This implementation:
- Preserves TypeScript types
- Cancels previous timeouts
- Maintains the original function context`,
    timestamp: new Date(),
  },
}

export const TableExample: Story = {
  args: {
    content: `Here's a comparison of state management solutions:

| Library | Bundle Size | Learning Curve | Best For |
|---------|------------|----------------|----------|
| Context API | 0KB (built-in) | Easy | Small to medium apps |
| Redux | ~10KB | Steep | Large, complex apps |
| Zustand | ~8KB | Moderate | Medium apps |
| Jotai | ~12KB | Moderate | Atomic state needs |

Each solution has its place depending on your specific requirements.`,
    timestamp: new Date(),
  },
}

export const ListsAndFormatting: Story = {
  args: {
    content: `I'll help you set up your development environment. Here's what we need to do:

**Prerequisites:**
- Node.js 18+ installed
- Git configured
- VS Code or your preferred editor

**Steps:**

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/your-org/project.git
   cd project
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   bun install
   \`\`\`

3. Set up environment variables
   - Copy \`.env.example\` to \`.env\`
   - Fill in your API keys
   - Configure database connection

4. Run the development server
   \`\`\`bash
   npm run dev
   \`\`\`

*Note: Make sure to never commit your \`.env\` file!*`,
    timestamp: new Date(),
  },
}

export const ErrorMessage: Story = {
  args: {
    content: `❌ **Error**: Unable to process your request

It looks like there's an issue with the API connection. Here are a few things to try:

1. Check your internet connection
2. Verify your API key is valid
3. Ensure you're not hitting rate limits

If the problem persists, please check the [status page](https://status.example.com) or contact support.`,
    timestamp: new Date(),
    assistantName: 'System',
  },
}

export const CustomAssistant: Story = {
  args: {
    content: 'I specialize in code review and can help identify potential issues in your codebase.',
    timestamp: new Date(),
    assistantName: 'Code Reviewer',
    avatarUrl: '/logo.svg',
  },
}