"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon, Plus, MoreVertical } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  id?: string
  title: string
  url: string
  icon?: LucideIcon
  emoji?: string
}

interface NavCollapsibleProps {
  title: string
  url: string
  icon?: LucideIcon
  items?: NavItem[]
  defaultOpen?: boolean
  showAddButton?: boolean
}

export function NavCollapsible({
  title,
  url,
  icon: Icon,
  items = [],
  defaultOpen = false,
  showAddButton = false,
}: NavCollapsibleProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <div className="flex items-center w-full">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="h-9 w-full justify-start p-[0.375rem] hover:bg-accent rounded-xl">
                  {Icon && (
                    <div 
                      className="h-6 w-6 p-0 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(!isOpen)
                      }}
                    >
                      <ChevronRight
                        className={cn(
                          "h-[14px] w-[14px] transition-transform duration-100",
                          isOpen && "rotate-90"
                        )}
                      />
                    </div>
                  )}
                  {Icon && (
                    <div className="flex items-center justify-center size-6">
                      <Icon className="size-[18px]" strokeWidth={2} />
                    </div>
                  )}
                  <span className="flex-1 text-left">{title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {showAddButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full opacity-0 group-hover/collapsible:opacity-100 transition-opacity duration-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="h-[14px] w-[14px]" />
                </Button>
              )}
            </div>
            <CollapsibleContent>
              {isOpen && items.length > 0 && (
                <div className="flex flex-row gap-px mx-1">
                  <div className="cursor-pointer ms-[8px] me-[2px] py-1">
                    <div className="border-l border-border h-full ms-[10px] me-[4px]" />
                  </div>
                  <div className="flex flex-col gap-px w-full min-w-0">
                    {items.map((item) => (
                      <SidebarMenuItem
                        key={item.id || item.title}
                        className="group/sidebar-menu-item mx-0"
                      >
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.url}
                          className="pl-3 pr-1.5 h-8 gap-1"
                        >
                          <Link href={item.url}>
                            {item.emoji ? (
                              <div className="-ms-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 p-0 hover:bg-transparent text-2xl"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {item.emoji}
                                </Button>
                              </div>
                            ) : item.icon ? (
                              <div className="flex items-center justify-center size-6">
                                <item.icon className="size-4" />
                              </div>
                            ) : null}
                            <span className="flex-1 select-none text-nowrap max-w-full overflow-hidden inline-block text-sm">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hidden group-hover/sidebar-menu-item:flex absolute right-1.5 top-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-[14px] w-[14px]" />
                        </Button>
                      </SidebarMenuItem>
                    ))}
                    {items.length > 5 && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-3 text-xs font-semibold text-muted-foreground hover:text-foreground h-auto py-2 mt-1"
                      >
                        See all
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}