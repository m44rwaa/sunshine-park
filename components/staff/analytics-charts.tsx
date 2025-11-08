"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface AnalyticsData {
  date: string
  total_visitors: number
  ticket_revenue: string
  merchandise_sales: string
  food_beverage_sales: string
  weather: string
}

interface AnalyticsChartsProps {
  analytics: AnalyticsData[]
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  // Transform data for charts
  const visitorData = analytics.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    visitors: day.total_visitors,
  }))

  const revenueData = analytics.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    tickets: Number.parseFloat(day.ticket_revenue),
    merchandise: Number.parseFloat(day.merchandise_sales),
    foodBeverage: Number.parseFloat(day.food_beverage_sales),
  }))

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visitor Trends</CardTitle>
          <CardDescription>Daily visitor count over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#f97316" strokeWidth={2} name="Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Daily revenue by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tickets" fill="#f97316" name="Tickets" />
              <Bar dataKey="merchandise" fill="#14b8a6" name="Merchandise" />
              <Bar dataKey="foodBeverage" fill="#fbbf24" name="Food & Beverage" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
