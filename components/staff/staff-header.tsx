"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { LogOut, Ticket } from "lucide-react"
import Link from "next/link"

interface StaffHeaderProps {
  user: {
    email?: string
    user_metadata?: {
      full_name?: string
    }
  }
}

export function StaffHeader({ user }: StaffHeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="bg-card border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/staff" className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Sunshine Park Staff</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {user.user_metadata?.full_name || user.email}
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
