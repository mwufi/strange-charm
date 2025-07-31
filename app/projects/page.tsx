"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FolderOpen, Plus, Search, MoreVertical, Calendar, Users } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample projects data
const projects = [
  {
    id: "1",
    name: "Capybara",
    description: "AI-powered code assistant with advanced features",
    lastUpdated: "2 hours ago",
    collaborators: 3,
    status: "active",
  },
  {
    id: "2",
    name: "Desktop AI Chat: Multi-Agent",
    description: "Multi-agent system for desktop AI interactions",
    lastUpdated: "1 day ago",
    collaborators: 5,
    status: "active",
  },
  {
    id: "3",
    name: "Create Goal-Setting System",
    description: "Comprehensive goal tracking and management platform",
    lastUpdated: "3 days ago",
    collaborators: 2,
    status: "active",
  },
  {
    id: "4",
    name: "E2B Setup & Backend Architecture",
    description: "Backend infrastructure for E2B integration",
    lastUpdated: "1 week ago",
    collaborators: 4,
    status: "archived",
  },
  {
    id: "5",
    name: "Build Gemini-powered coding assistant",
    description: "AI coding assistant powered by Google Gemini",
    lastUpdated: "2 weeks ago",
    collaborators: 1,
    status: "active",
  },
  {
    id: "6",
    name: "Create Space Shooter Game",
    description: "Retro-style space shooter game with modern graphics",
    lastUpdated: "3 weeks ago",
    collaborators: 3,
    status: "archived",
  },
]

export default function ProjectsPage() {
  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-muted-foreground">Manage and organize all your projects in one place</p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
            />
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      <Link href={`/projects/${project.id}`} className="hover:underline">
                        {project.name}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
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
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {project.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{project.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{project.collaborators}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}