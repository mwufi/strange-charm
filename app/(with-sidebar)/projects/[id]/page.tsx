"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  MessageSquare, 
  Plus, 
  Search, 
  Code,
  FileJson,
  FileImage,
  MoreVertical,
  Clock,
  Download,
  Trash2,
  Edit
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample project data
const projectsData: Record<string, any> = {
  "1": {
    name: "Ara",
    description: "AI-powered code assistant with advanced features",
    files: [
      { id: "1", name: "README.md", type: "markdown", size: "4.2 KB", modified: "2 hours ago" },
      { id: "2", name: "main.py", type: "python", size: "12.8 KB", modified: "3 hours ago" },
      { id: "3", name: "config.json", type: "json", size: "1.1 KB", modified: "1 day ago" },
      { id: "4", name: "assistant.py", type: "python", size: "8.5 KB", modified: "1 day ago" },
      { id: "5", name: "requirements.txt", type: "text", size: "256 B", modified: "2 days ago" },
    ],
    chats: [
      { id: "1", title: "Initial setup and configuration", messages: 24, lastActive: "2 hours ago" },
      { id: "2", title: "Implementing core features", messages: 45, lastActive: "1 day ago" },
      { id: "3", title: "Bug fixes and optimization", messages: 12, lastActive: "2 days ago" },
    ]
  },
  "2": {
    name: "Desktop AI Chat: Multi-Agent",
    description: "Multi-agent system for desktop AI interactions",
    files: [
      { id: "1", name: "app.tsx", type: "typescript", size: "15.3 KB", modified: "1 hour ago" },
      { id: "2", name: "agents.ts", type: "typescript", size: "9.7 KB", modified: "3 hours ago" },
      { id: "3", name: "styles.css", type: "css", size: "3.2 KB", modified: "5 hours ago" },
      { id: "4", name: "package.json", type: "json", size: "1.8 KB", modified: "1 day ago" },
    ],
    chats: [
      { id: "1", title: "Architecture design discussion", messages: 36, lastActive: "3 hours ago" },
      { id: "2", title: "Agent communication protocol", messages: 28, lastActive: "1 day ago" },
    ]
  },
  "3": {
    name: "Create Goal-Setting System",
    description: "Comprehensive goal tracking and management platform",
    files: [
      { id: "1", name: "goals.db", type: "database", size: "45.2 KB", modified: "30 minutes ago" },
      { id: "2", name: "dashboard.html", type: "html", size: "8.9 KB", modified: "2 hours ago" },
      { id: "3", name: "tracker.js", type: "javascript", size: "11.4 KB", modified: "3 hours ago" },
    ],
    chats: [
      { id: "1", title: "Database schema design", messages: 18, lastActive: "1 hour ago" },
      { id: "2", title: "UI/UX improvements", messages: 22, lastActive: "3 hours ago" },
    ]
  }
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "python":
    case "javascript":
    case "typescript":
      return <Code className="h-4 w-4" />
    case "json":
      return <FileJson className="h-4 w-4" />
    case "image":
      return <FileImage className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projectsData[projectId] || projectsData["1"]
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="files" className="space-y-4">
        <TabsList>
          <TabsTrigger value="files">
            <FileText className="h-4 w-4 mr-2" />
            Files ({project.files.length})
          </TabsTrigger>
          <TabsTrigger value="chats">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chats ({project.chats.length})
          </TabsTrigger>
        </TabsList>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add File
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {project.files.map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {file.modified}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chats Tab */}
        <TabsContent value="chats" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button asChild>
              <Link href="/chat">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {project.chats.map((chat: any) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        <Link href={`/chat/${chat.id}`} className="hover:underline">
                          {chat.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {chat.messages} messages
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last active {chat.lastActive}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}