"use client"

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation"

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isChatPage = pathname.startsWith('/chat')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {!isChatPage && (
          <header className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
          </header>
        )}
        <main className={isChatPage ? "h-full" : "flex-1"}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}