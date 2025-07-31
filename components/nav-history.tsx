"use client"

import * as React from "react"
import { ChevronRight, Clock, MoreVertical } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HistoryItem {
  id: string
  title: string
  url: string
  date: Date
}

interface GroupedHistory {
  label: string
  items: HistoryItem[]
}

export function NavHistory({ items = [] }: { items?: HistoryItem[] }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Group items by time period
  const groupedItems = React.useMemo(() => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const groups: GroupedHistory[] = []
    const thisWeek = items.filter(item => item.date >= oneWeekAgo)
    const thisMonth = items.filter(item => item.date < oneWeekAgo && item.date >= oneMonthAgo)
    const older = items.filter(item => item.date < oneMonthAgo)

    if (thisWeek.length > 0) {
      groups.push({ label: "This Week", items: thisWeek })
    }
    if (thisMonth.length > 0) {
      const monthName = new Date().toLocaleString('default', { month: 'long' })
      groups.push({ label: monthName, items: thisMonth })
    }
    if (older.length > 0) {
      // Group older items by month
      const monthGroups = new Map<string, HistoryItem[]>()
      older.forEach(item => {
        const monthKey = item.date.toLocaleString('default', { month: 'long', year: 'numeric' })
        if (!monthGroups.has(monthKey)) {
          monthGroups.set(monthKey, [])
        }
        monthGroups.get(monthKey)!.push(item)
      })
      
      monthGroups.forEach((monthItems, label) => {
        groups.push({ label, items: monthItems })
      })
    }

    return groups
  }, [items])

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-transparent data-[state=open]:hover:bg-transparent"
            >
              <div className="flex items-center w-full">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-full justify-start p-[0.375rem] hover:bg-accent rounded-xl"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 hover:bg-transparent"
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
                    </Button>
                    <div className="flex items-center justify-center size-6">
                      <Clock className="size-[18px]" strokeWidth={2} />
                    </div>
                    <span className="flex-1 text-left">History</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </SidebarMenuButton>
            <CollapsibleContent>
              {isOpen && groupedItems.length > 0 && (
                <div className="flex flex-row gap-px mx-1">
                  <div className="cursor-pointer ms-[8px] me-[2px] py-1">
                    <div className="border-l border-border h-full ms-[10px] me-[4px]" />
                  </div>
                  <div className="flex flex-col gap-px w-full min-w-0">
                    {groupedItems.map((group) => (
                      <React.Fragment key={group.label}>
                        <div className="py-1 pl-3 text-xs text-primary sticky top-0 z-20 text-nowrap font-semibold">
                          {group.label}
                        </div>
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="group/sidebar-menu-item relative"
                          >
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === item.url}
                              className="pl-3 pr-1.5 h-8 gap-1"
                            >
                              <Link href={item.url}>
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
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 text-xs font-semibold text-muted-foreground hover:text-foreground h-auto py-2 mt-1"
                    >
                      See all
                    </Button>
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