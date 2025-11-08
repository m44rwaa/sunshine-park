import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { StaffHeader } from "@/components/staff/staff-header"
import { AnalyticsCharts } from "@/components/staff/analytics-charts"
import { AnalyticsStats } from "@/components/staff/analytics-stats"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AnalyticsPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch analytics for the past 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0]

  const { data: analytics } = await supabase
    .from("park_analytics")
    .select("*")
    .gte("date", thirtyDaysAgoStr)
    .order("date", { ascending: true })

  // Calculate totals and averages
  const totalVisitors = analytics?.reduce((sum, day) => sum + day.total_visitors, 0) || 0
  const totalRevenue = analytics?.reduce((sum, day) => sum + Number.parseFloat(day.ticket_revenue), 0) || 0
  const avgVisitors = analytics && analytics.length > 0 ? Math.round(totalVisitors / analytics.length) : 0

  return (
    <div className="min-h-screen bg-background">
      <StaffHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Park Analytics</h1>
            <p className="text-muted-foreground">View visitor trends and revenue insights</p>
          </div>
          <div className="flex gap-2">
            <Link href="/staff">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/staff/schedule">
              <Button variant="outline">Schedule</Button>
            </Link>
          </div>
        </div>

        <AnalyticsStats totalVisitors={totalVisitors} totalRevenue={totalRevenue} avgVisitors={avgVisitors} />

        <div className="mt-8">
          <AnalyticsCharts analytics={analytics || []} />
        </div>
      </main>
    </div>
  )
}
