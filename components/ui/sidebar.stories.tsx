import type { Meta, StoryObj } from '@storybook/react'
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
  SidebarProvider,
  SidebarTrigger,
} from './sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'
import {
  Search,
  Plus,
  Globe,
  FolderOpen,
  History,
  ChevronRight,
  Home,
  Settings,
  User,
  Bot,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'

export default {
  title: 'UI/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

// Basic Sidebar
export const Basic: StoryObj = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="px-4 text-lg font-semibold">My App</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold mt-4">Main Content</h1>
          <p className="text-muted-foreground mt-2">Click the trigger to toggle the sidebar</p>
        </div>
      </div>
    </SidebarProvider>
  ),
}

// Sidebar with Groups
export const WithGroups: StoryObj = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Bot className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">
          <SidebarTrigger />
        </div>
      </div>
    </SidebarProvider>
  ),
}

// Collapsible Sidebar Groups
export const CollapsibleGroups: StoryObj = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm">A</span>
              </div>
              <span className="font-semibold">Ara</span>
            </div>
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

            {/* Projects - Collapsible */}
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
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Ara Assistant</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Chat Application</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Goal Tracker</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton className="text-muted-foreground">
                            <span>See all</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroup>

            {/* History - Collapsible */}
            <SidebarGroup>
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
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span className="truncate">React hooks implementation</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span className="truncate">Database schema design</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span className="truncate">API authentication setup</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
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
        </Sidebar>
        <div className="flex-1 p-6">
          <SidebarTrigger />
          <div className="mt-8">
            <h1 className="text-2xl font-bold">Collapsible Sidebar Groups</h1>
            <p className="text-muted-foreground mt-2">
              Click on Projects or History to expand/collapse the sections
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
}

// Sidebar States
export const SidebarStates: StoryObj = {
  render: () => {
    const menuItems = [
      { icon: Home, label: 'Home', active: true },
      { icon: User, label: 'Profile', active: false },
      { icon: Settings, label: 'Settings', active: false },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Menu Button States</h3>
          <div className="space-y-2 max-w-xs">
            <div className="p-2 border rounded">
              <p className="text-sm text-muted-foreground mb-2">Default</p>
              <SidebarMenuButton>
                <Home className="h-4 w-4" />
                <span>Home</span>
              </SidebarMenuButton>
            </div>
            
            <div className="p-2 border rounded">
              <p className="text-sm text-muted-foreground mb-2">Hover State</p>
              <SidebarMenuButton className="bg-accent">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </SidebarMenuButton>
            </div>
            
            <div className="p-2 border rounded">
              <p className="text-sm text-muted-foreground mb-2">Active State</p>
              <SidebarMenuButton className="bg-secondary">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Group Labels</h3>
          <div className="space-y-4 max-w-xs">
            <div className="p-4 border rounded">
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            </div>
            <div className="p-4 border rounded">
              <SidebarGroupLabel className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                With Icon
              </SidebarGroupLabel>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Submenu Items</h3>
          <div className="p-4 border rounded max-w-xs">
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>
                  <span>Submenu Item 1</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>
                  <span>Submenu Item 2</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton className="text-muted-foreground">
                  <span>Muted Item</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </div>
        </div>
      </div>
    )
  },
}