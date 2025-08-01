import type { Meta, StoryObj } from '@storybook/react'
import { FileCard, CodeCard, LinkCard, ActionCard, ToolUseCard } from './MessageCard'
import { FileText, Play, ChevronRight, Zap } from 'lucide-react'

// Default export for Storybook navigation
export default {
  title: 'Chat/MessageCards',
  parameters: {
    layout: 'centered',
  },
}

// File Card Stories
export const DefaultFile: StoryObj = {
  render: () => (
    <FileCard
      fileName="project-summary.pdf"
      fileSize="2.4 MB"
      fileType="pdf"
      downloadUrl="#"
    />
  ),
}

export const CodeFile: StoryObj<typeof FileCard> = {
  render: () => (
    <FileCard
      fileName="index.ts"
      fileSize="14.2 KB"
      fileType="typescript"
      downloadUrl="#"
    />
  ),
}

export const ImageFile: StoryObj<typeof FileCard> = {
  render: () => (
    <FileCard
      fileName="design-mockup.png"
      fileSize="856 KB"
      fileType="image"
      downloadUrl="#"
    />
  ),
}

// Code Card Stories
export const CodeExample: StoryObj<typeof CodeCard> = {
  render: () => (
    <CodeCard
      language="typescript"
      fileName="auth.service.ts"
      code={`import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}`}
    />
  ),
}

export const ShortCode: StoryObj<typeof CodeCard> = {
  render: () => (
    <CodeCard
      language="javascript"
      code={`const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};`}
      showLineNumbers={false}
    />
  ),
}

// Link Card Stories
export const LinkPreview: StoryObj<typeof LinkCard> = {
  render: () => (
    <LinkCard
      url="https://react.dev"
      title="React – The library for web and native user interfaces"
      description="React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video."
      domain="react.dev"
      imageUrl="https://react.dev/images/og-home.png"
    />
  ),
}

export const LinkWithoutImage: StoryObj<typeof LinkCard> = {
  render: () => (
    <LinkCard
      url="https://github.com/vercel/next.js"
      title="vercel/next.js: The React Framework"
      description="The React Framework. Contribute to vercel/next.js development by creating an account on GitHub."
      domain="github.com"
    />
  ),
}

// Action Card Stories
export const SuggestedActions: StoryObj<typeof ActionCard> = {
  render: () => (
    <ActionCard
      title="What should I do next?"
      description="Based on our conversation, here are some suggested next steps:"
      actions={[
        {
          label: "Create project structure",
          icon: <FileText className="h-4 w-4" />,
          onClick: () => console.log('Create project'),
        },
        {
          label: "Set up authentication",
          icon: <Zap className="h-4 w-4" />,
          onClick: () => console.log('Set up auth'),
        },
        {
          label: "Design database schema",
          icon: <ChevronRight className="h-4 w-4" />,
          onClick: () => console.log('Design schema'),
        },
      ]}
    />
  ),
}

export const QuickActions: StoryObj<typeof ActionCard> = {
  render: () => (
    <ActionCard
      title="Quick Actions"
      actions={[
        {
          label: "Run tests",
          icon: <Play className="h-4 w-4" />,
        },
        {
          label: "Deploy to staging",
        },
        {
          label: "View logs",
        },
      ]}
    />
  ),
}

// Tool Use Card Stories
export const ToolRunning: StoryObj<typeof ToolUseCard> = {
  render: () => (
    <ToolUseCard
      toolName="Web Search"
      status="running"
      description="Searching for React best practices..."
    />
  ),
}

export const ToolCompleted: StoryObj<typeof ToolUseCard> = {
  render: () => (
    <ToolUseCard
      toolName="Code Analysis"
      status="completed"
      description="Analyzed 42 files in your project"
      result="Found 3 potential improvements:
- Unused imports in 5 files
- Missing error handling in auth.service.ts
- Opportunity to extract shared logic into custom hook"
    />
  ),
}

export const ToolFailed: StoryObj<typeof ToolUseCard> = {
  render: () => (
    <ToolUseCard
      toolName="Deploy"
      status="failed"
      description="Failed to deploy to production"
      result="Error: Insufficient permissions"
    />
  ),
}

// Combined Example
export const MessageWithCards: StoryObj = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-foreground/70">I've analyzed your project structure. Here's what I found:</p>
      
      <FileCard
        fileName="package.json"
        fileSize="2.1 KB"
        fileType="json"
      />
      
      <p className="text-foreground/70">Your authentication service looks good, but I noticed a few improvements:</p>
      
      <CodeCard
        language="typescript"
        fileName="auth.service.ts"
        code={`// Add rate limiting
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds
});`}
      />
      
      <ActionCard
        title="Suggested improvements"
        actions={[
          { label: "Add rate limiting" },
          { label: "Implement refresh tokens" },
          { label: "Add 2FA support" },
        ]}
      />
    </div>
  ),
}