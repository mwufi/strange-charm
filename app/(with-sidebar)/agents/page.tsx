"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Bot, 
  Plus, 
  Search, 
  MoreVertical,
  Zap,
  Brain,
  Code,
  FileSearch,
  MessageSquare,
  Sparkles,
  Settings,
  Power
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample agents data
const agents = [
  {
    id: "1",
    name: "Code Assistant",
    description: "Helps with code generation, debugging, and refactoring",
    icon: Code,
    status: "active",
    capabilities: ["Code Generation", "Debugging", "Refactoring", "Testing"],
    usage: "1.2k interactions",
    lastActive: "Currently active",
  },
  {
    id: "2",
    name: "Research Agent",
    description: "Searches and analyzes information from various sources",
    icon: FileSearch,
    status: "active",
    capabilities: ["Web Search", "Document Analysis", "Summarization"],
    usage: "856 interactions",
    lastActive: "2 minutes ago",
  },
  {
    id: "3",
    name: "Creative Writer",
    description: "Assists with creative writing, storytelling, and content creation",
    icon: Sparkles,
    status: "active",
    capabilities: ["Story Writing", "Content Creation", "Editing"],
    usage: "432 interactions",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Data Analyst",
    description: "Analyzes data patterns and provides insights",
    icon: Brain,
    status: "inactive",
    capabilities: ["Data Analysis", "Visualization", "Statistical Modeling"],
    usage: "1.5k interactions",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Conversation Agent",
    description: "Engages in natural conversations and provides general assistance",
    icon: MessageSquare,
    status: "active",
    capabilities: ["Natural Language", "Q&A", "General Assistance"],
    usage: "2.3k interactions",
    lastActive: "5 minutes ago",
  },
  {
    id: "6",
    name: "Automation Bot",
    description: "Automates repetitive tasks and workflows",
    icon: Zap,
    status: "inactive",
    capabilities: ["Task Automation", "Workflow Management", "Scheduling"],
    usage: "678 interactions",
    lastActive: "1 week ago",
  },
]

export default function AgentsPage() {
  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agents</h1>
        <p className="text-muted-foreground">Manage and configure your AI agents</p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-10"
            />
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon
          return (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge 
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        <Power className="h-3 w-3 mr-1" />
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Bot className="h-4 w-4 mr-2" />
                        Open Chat
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Agent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {agent.description}
                </CardDescription>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Capabilities</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((capability) => (
                        <Badge key={capability} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{agent.usage}</span>
                    <span>{agent.lastActive}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}