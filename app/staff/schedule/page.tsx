import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { StaffHeader } from "@/components/staff/staff-header"
import { ScheduleCalendar } from "@/components/staff/schedule-calendar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function SchedulePage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch schedules for the next 30 days
  const today = new Date().toISOString().split("T")[0]
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 30)
  const thirtyDaysLater = futureDate.toISOString().split("T")[0]

  const { data: schedules } = await supabase
    .from("staff_schedules")
    .select("*")
    .gte("shift_date", today)
    .lte("shift_date", thirtyDaysLater)
    .order("shift_date")
    .order("shift_start")

  return (
    <div className="min-h-screen bg-background">
      <StaffHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Staff Schedule</h1>
            <p className="text-muted-foreground">Manage shifts and view upcoming schedules</p>
          </div>
          <div className="flex gap-2">
            <Link href="/staff">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/staff/analytics">
              <Button variant="outline">Analytics</Button>
            </Link>
          </div>
        </div>

        <ScheduleCalendar schedules={schedules || []} userId={user.id} />
      </main>
    </div>
  )
}
