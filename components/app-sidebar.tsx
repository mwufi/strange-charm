"use client"

import * as React from "react"
import {
  Search,
  Plus,
  Globe,
  FolderOpen,
  History,
  Minus,
  ChevronRight,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

// Sample data for projects and history
const recentProjects = [
  {
    id: "1",
    name: "Ara",
    url: "/projects/1",
  },
  {
    id: "2", 
    name: "Desktop AI Chat: Multi-Agent",
    url: "/projects/2",
  },
  {
    id: "3",
    name: "Create Goal-Setting System",
    url: "/projects/3",
  },
]

const chatHistory = [
  {
    id: "1",
    title: "Desktop AI Chat: Multi-Agent",
    url: "/chat/1",
  },
  {
    id: "2",
    title: "Create Goal-Setting System",
    url: "/chat/2",
  },
  {
    id: "3",
    title: "E2B Setup & Backend Architecture",
    url: "/chat/3",
  },
  {
    id: "4",
    title: "Build Gemini-powered coding assistant",
    url: "/chat/4",
  },
  {
    id: "5",
    title: "Subagent Book Responses: CSV processing",
    url: "/chat/5",
  },
  {
    id: "6",
    title: "Create Space Shooter Game",
    url: "/chat/6",
  },
  {
    id: "7",
    title: "Scout capabilities inquiry",
    url: "/chat/7",
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
              <SidebarMenuButton asChild>
                <Link href="/chat">
                  <Plus className="h-4 w-4" />
                  <span>New chat</span>
                </Link>
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
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <FolderOpen className="h-4 w-4" />
                    <span>Projects</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {recentProjects.map((project) => (
                      <SidebarMenuSubItem key={project.id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={project.url}>
                            <span>{project.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/projects" className="text-muted-foreground">
                          <span>See all</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        {/* History */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <History className="h-4 w-4" />
                    <span>History</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {chatHistory.map((chat) => (
                      <SidebarMenuSubItem key={chat.id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={chat.url}>
                            <span className="truncate">{chat.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-muted-foreground">
                        <span>Show more</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
