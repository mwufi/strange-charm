"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon, Plus, MoreVertical } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar"

interface NavItem {
  id?: string
  title: string
  url: string
  icon?: LucideIcon
  emoji?: string
}

interface NavCollapsibleMenuProps {
  title: string
  url: string
  icon?: LucideIcon
  items?: NavItem[]
  defaultOpen?: boolean
  showAddButton?: boolean
}

export function NavCollapsibleMenu({
  title,
  url,
  icon: Icon,
  items = [],
  defaultOpen = false,
  showAddButton = false,
}: NavCollapsibleMenuProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible
          defaultOpen={defaultOpen}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={title}>
                {Icon && <Icon className="transition-all duration-200 group-hover/menu-item:hidden" />}
                <ChevronRight className="hidden transition-all duration-200 group-hover/menu-item:block group-data-[state=open]/collapsible:rotate-90" />
                <span>{title}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            {showAddButton && (
              <SidebarMenuAction showOnHover>
                <Plus className="h-4 w-4" />
              </SidebarMenuAction>
            )}
            <CollapsibleContent>
              <SidebarMenuSub>
                {items.map((item) => (
                  <SidebarMenuSubItem key={item.id || item.title}>
                    <SidebarMenuSubButton asChild>
                      <Link href={item.url}>
                        {item.emoji && (
                          <span className="text-base">{item.emoji}</span>
                        )}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}