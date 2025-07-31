'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatInput, ChatSubmitOptions } from '@/components/chat/ChatInput'
import { ChatMessage } from '@/components/chat/ChatMessage'
import BlurredBackground from '@/components/BlurredBackground'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

const sampleResponses = [
  `# Hello! I'm here to help 🚀

I can assist you with a variety of tasks:

- **Writing code** in multiple languages
- **Answering questions** about various topics
- **Creative writing** and brainstorming
- **Data analysis** and problem-solving

## Here's a quick example:

\`\`\`python
def greet(name):
    return f"Hello, {name}! Welcome to our chat!"

print(greet("User"))
\`\`\`

Feel free to ask me anything!`,
  
  `That's an interesting question! Let me break it down for you:

1. **First point**: This is important because...
2. **Second point**: Consider the following...
3. **Third point**: Additionally, we should note...

> "The best way to predict the future is to invent it." - Alan Kay

Would you like me to elaborate on any of these points?`,
  
  `Here's a simple implementation:

\`\`\`javascript
function calculateSum(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Example usage
const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result); // Output: 15
\`\`\`

This function uses the \`reduce\` method to sum all numbers in an array. It's efficient and clean!`,
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [bgSettings, setBgSettings] = useState({
    pattern: 'gradient' as 'waves' | 'circles' | 'gradient',
    color: '#8B5CF6',
    opacity: 0.2
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const settings = localStorage.getItem('backgroundSettings')
    if (settings) {
      setBgSettings(JSON.parse(settings))
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateStreaming = async (responseText: string, messageId: string) => {
    const words = responseText.split(' ')
    let currentText = ''

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i]
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: currentText, isStreaming: true }
          : msg
      ))

      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50))
    }

    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isStreaming: false }
        : msg
    ))
  }

  const handleSubmit = async (message: string, options?: ChatSubmitOptions) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message
    }

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      isStreaming: true
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])

    // Simulate AI response
    const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
    await simulateStreaming(response, assistantMessage.id)
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <BlurredBackground {...bgSettings} />
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pb-48"
      >
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                  Start a conversation
                </h1>
                <p className="text-gray-600">
                  Ask me anything and I'll do my best to help!
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  isStreaming={message.isStreaming}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-4xl mx-auto p-4">
          <ChatInput 
            onSubmit={handleSubmit}
            placeholder="Ask anything..."
            attachmentPosition="top"
          />
        </div>
      </div>
    </div>
  )
}