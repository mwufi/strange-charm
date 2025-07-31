"use client"

import * as React from "react"
import {
  Search,
  Plus,
  Globe,
  FolderOpen,
  History,
} from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Sample data for projects and history
const recentProjects = [
  {
    id: "1",
    name: "Capybara",
    url: "#",
  },
  {
    id: "2", 
    name: "Desktop AI Chat: Multi-Agent",
    url: "#",
  },
  {
    id: "3",
    name: "Create Goal-Setting System",
    url: "#",
  },
]

const chatHistory = [
  {
    id: "1",
    title: "Desktop AI Chat: Multi-Agent",
    url: "#",
  },
  {
    id: "2",
    title: "Create Goal-Setting System",
    url: "#",
  },
  {
    id: "3",
    title: "E2B Setup & Backend Architecture",
    url: "#",
  },
  {
    id: "4",
    title: "Build Gemini-powered coding assistant",
    url: "#",
  },
  {
    id: "5",
    title: "Subagent Book Responses: CSV processing",
    url: "#",
  },
  {
    id: "6",
    title: "Create Space Shooter Game",
    url: "#",
  },
  {
    id: "7",
    title: "Scout capabilities inquiry",
    url: "#",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
          <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center">
            <span className="text-white text-sm">⚡</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* Search */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>Search</span>
                <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">⌘K</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* New Chat */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Plus className="h-4 w-4" />
                <span>New chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Agents */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Globe className="h-4 w-4" />
                <span>Agents</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Projects */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {recentProjects.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton asChild>
                  <Link href={project.url}>
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/projects" className="text-muted-foreground">
                  <span>See all</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* History */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarMenu>
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton asChild>
                  <Link href={chat.url}>
                    <span className="truncate">{chat.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground">
                <span>Show more</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
