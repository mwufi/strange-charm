import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AssistantMessage } from '../components/chat/AssistantMessage'
import { UserMessage } from '../components/chat/UserMessage'
import { ChatInput } from '../components/chat/ChatInput'
import { FileCard, CodeCard, ActionCard } from '../components/chat/MessageCard'
import { SearchModal } from '../components/SearchModal'
import { ChatHeader } from '../components/chat/ChatHeader'
import { Button } from '@/components/ui/button'

export default {
  title: 'Examples/Complete Chat Interface',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export const ChatInterface: StoryObj = {
  render: () => {
    const [messages, setMessages] = useState([
      {
        id: '1',
        type: 'user',
        content: 'Can you help me build a React component for displaying user profiles?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: '2',
        type: 'assistant',
        content: `I'll help you create a React component for displaying user profiles. Let me design a clean, reusable component with TypeScript.

Here's a comprehensive UserProfile component:`,
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        reasoning: `The user wants a React component for user profiles. I should:
1. Create a TypeScript interface for type safety
2. Make it responsive and accessible
3. Include common profile elements (avatar, name, bio, stats)
4. Add some interactive elements
5. Use modern React patterns`,
      },
    ])

    const [showSearch, setShowSearch] = useState(false)

    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <ChatHeader
          title="React Component Development"
          onSearchClick={() => setShowSearch(true)}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map(message => {
              if (message.type === 'user') {
                return (
                  <UserMessage
                    key={message.id}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                )
              }

              return (
                <div key={message.id} className="space-y-4">
                  <AssistantMessage
                    content={message.content}
                    timestamp={message.timestamp}
                    reasoning={message.reasoning}
                    showThinking
                  />

                  {message.id === '2' && (
                    <>
                      <CodeCard
                        language="typescript"
                        fileName="UserProfile.tsx"
                        code={`import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
    stats?: {
      followers: number;
      following: number;
      posts: number;
    };
  };
  onFollow?: () => void;
  isFollowing?: boolean;
}

export function UserProfile({ user, onFollow, isFollowing = false }: UserProfileProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
        {onFollow && (
          <Button
            onClick={onFollow}
            variant={isFollowing ? "outline" : "default"}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {user.bio && (
          <p className="text-sm mb-4">{user.bio}</p>
        )}
        {user.stats && (
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold">{user.stats.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}`}
                      />

                      <div className="space-y-4">
                        <AssistantMessage
                          content={`I've also created a simple usage example to show how to implement this component:`}
                          timestamp={new Date(Date.now() - 1000 * 60 * 3)}
                        />

                        <CodeCard
                          language="typescript"
                          fileName="App.tsx"
                          code={`function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const user = {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Full-stack developer | React enthusiast | Coffee lover ☕',
    stats: {
      posts: 142,
      followers: 1234,
      following: 567
    }
  };
  
  return (
    <UserProfile
      user={user}
      isFollowing={isFollowing}
      onFollow={() => setIsFollowing(!isFollowing)}
    />
  );
}`}
                        />

                        <FileCard
                          fileName="user-profile-styles.css"
                          fileSize="2.3 KB"
                          fileType="css"
                        />

                        <ActionCard
                          title="What would you like to do next?"
                          actions={[
                            { label: "Add animations" },
                            { label: "Create variations" },
                            { label: "Add tests" },
                            { label: "Optimize performance" },
                          ]}
                        />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Input */}
        <div className="border-t">
          <ChatInput
            placeholder="Ask a follow-up question..."
            showStatus
            onSubmit={(message, mentions, attachments, options) => {
              const newMessage = {
                id: String(Date.now()),
                type: 'user' as const,
                content: message,
                timestamp: new Date(),
              }
              setMessages([...messages, newMessage])
            }}
          />
        </div>

        {/* Search Modal */}
        <SearchModal
          open={showSearch}
          onOpenChange={setShowSearch}
          onSelect={(result) => {
            console.log('Selected:', result)
          }}
        />
      </div>
    )
  },
}

export const EmptyState: StoryObj = {
  render: () => {
    const [showSearch, setShowSearch] = useState(false)

    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <ChatHeader
          title="New Chat"
          onSearchClick={() => setShowSearch(true)}
        />

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold">Start a new conversation</h2>
            <p className="text-muted-foreground">
              Ask me anything about coding, get help with debugging, or explore new ideas.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="outline" size="sm">
                Help me debug code
              </Button>
              <Button variant="outline" size="sm">
                Explain a concept
              </Button>
              <Button variant="outline" size="sm">
                Review my code
              </Button>
              <Button variant="outline" size="sm">
                Build something new
              </Button>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t">
          <ChatInput
            placeholder="Ask anything..."
            showStatus
            onSubmit={(message, mentions, attachments, options) => {
              console.log('Submitted:', { message, mentions, attachments, options })
            }}
          />
        </div>

        {/* Search Modal */}
        <SearchModal
          open={showSearch}
          onOpenChange={setShowSearch}
        />
      </div>
    )
  },
}