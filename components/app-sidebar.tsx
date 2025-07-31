"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  MessageSquare,
  Mic,
  FileText,
  ListTodo,
  FolderOpen,
  Clock,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { SidebarSearch } from "@/components/sidebar-search"
import { NavSimple } from "@/components/nav-simple"
import { SidebarFooterContent } from "@/components/sidebar-footer"
import { NavCollapsibleMenu } from "@/components/nav-collapsible-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navTop: [
    {
      title: "Chat",
      url: "/",
      icon: MessageSquare,
    },
    {
      title: "Voice",
      url: "/voice",
      icon: Mic,
    },
    {
      title: "Files",
      url: "/files",
      icon: FileText,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: ListTodo,
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      id: "1",
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      id: "2",
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      id: "3",
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  projectItems: [
    {
      id: "p1",
      title: "New Project",
      url: "/project/c4007526-c5df-47ad-8d72-a3141cda0d7d",
      emoji: "🥤",
    },
    {
      id: "p2",
      title: "Startup space",
      url: "/project/7d4f0d69-edbf-43e7-b947-8f6399bc18a0",
      emoji: "✈️",
    },
  ],
  historyItems: [
    {
      id: "h1",
      title: "Value of Learning in AI Era",
      url: "/chat/c80e9071-9703-4ae5-9f30-69395846a521",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "h2",
      title: "Innovative Modular AI Campus Design",
      url: "/chat/aca20048-90f3-4969-a4fb-2721c0dcc6c0",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "h3",
      title: "Billionaire's AI Startup Town Investment",
      url: "/chat/6ab2baba-2e5c-4323-810e-ffade702afbf",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: "h4",
      title: "Cost-Effective Home Construction Methods",
      url: "/chat/f18e587c-687a-4678-b979-a747677a699f",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "h5",
      title: "Converting Numbers to Percentages",
      url: "/chat/5f5ebb9f-9b18-49e4-8864-8e0175c50525",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: "h6",
      title: "Troubleshooting aria2c on AWS Fargate",
      url: "/chat/773a775a-0540-4a97-894b-b1d61d673440",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
    {
      id: "h7",
      title: "Downloading Torrent Data to AWS",
      url: "/chat/647ea1d7-9e2d-4665-93bb-93ab31e6f536",
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarSearch />
        </SidebarGroup>
        <NavSimple items={data.navTop} />
        <NavCollapsibleMenu
          title="Projects"
          url="/projects"
          icon={FolderOpen}
          items={data.projectItems.map(item => ({
            ...item,
            title: item.title,
            url: item.url
          }))}
          defaultOpen={true}
          showAddButton={true}
        />
        <NavCollapsibleMenu
          title="History"
          url="/history"
          icon={Clock}
          items={data.historyItems.map(item => ({
            ...item,
            title: item.title,
            url: item.url
          }))}
          defaultOpen={false}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
