"use client"

import { useState } from "react"
import { StatsCards } from "@/components/staff/stats-cards"
import { InventoryTable } from "@/components/staff/inventory-table"
import { ScheduleCalendar } from "@/components/staff/schedule-calendar"
import { AnalyticsCharts } from "@/components/staff/analytics-charts"
import { AnalyticsStats } from "@/components/staff/analytics-stats"
import { Button } from "@/components/ui/button"
import { Package, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"

const mockItems = [
  {
    id: "1",
    name: "Popcorn",
    description: "Fresh buttered popcorn",
    quantity: 150,
    min_quantity: 50,
    unit: "bags",
    status: "in_stock",
    inventory_categories: { name: "Food" },
  },
  {
    id: "2",
    name: "Soda",
    description: "Assorted soft drinks",
    quantity: 45,
    min_quantity: 100,
    unit: "cans",
    status: "low_stock",
    inventory_categories: { name: "Drinks" },
  },
  {
    id: "3",
    name: "T-Shirts",
    description: "Sunshine Park branded shirts",
    quantity: 0,
    min_quantity: 20,
    unit: "pieces",
    status: "out_of_stock",
    inventory_categories: { name: "Merchandise" },
  },
  {
    id: "4",
    name: "Hot Dogs",
    description: "Grilled hot dogs with buns",
    quantity: 200,
    min_quantity: 80,
    unit: "pieces",
    status: "in_stock",
    inventory_categories: { name: "Food" },
  },
  {
    id: "5",
    name: "Water Bottles",
    description: "Cold bottled water",
    quantity: 30,
    min_quantity: 100,
    unit: "bottles",
    status: "low_stock",
    inventory_categories: { name: "Drinks" },
  },
  {
    id: "6",
    name: "Ice Cream",
    description: "Various flavors",
    quantity: 120,
    min_quantity: 60,
    unit: "servings",
    status: "in_stock",
    inventory_categories: { name: "Food" },
  },
  {
    id: "7",
    name: "Caps",
    description: "Sunshine Park baseball caps",
    quantity: 35,
    min_quantity: 30,
    unit: "pieces",
    status: "in_stock",
    inventory_categories: { name: "Merchandise" },
  },
]

const mockCategories = [
  { id: "1", name: "Food", description: "Food items and snacks" },
  { id: "2", name: "Drinks", description: "Beverages" },
  { id: "3", name: "Merchandise", description: "Souvenirs and gifts" },
]

const today = new Date()
const getDateString = (daysOffset: number) => {
  const date = new Date(today)
  date.setDate(today.getDate() + daysOffset)
  return date.toISOString().split("T")[0]
}

const mockSchedules = [
  {
    id: "1",
    shift_date: getDateString(0),
    shift_start: "09:00",
    shift_end: "17:00",
    position: "Ride Operator",
    location: "Roller Coaster Area",
    status: "scheduled",
    notes: null,
  },
  {
    id: "2",
    shift_date: getDateString(0),
    shift_start: "10:00",
    shift_end: "18:00",
    position: "Cashier",
    location: "Food Court",
    status: "scheduled",
    notes: null,
  },
  {
    id: "3",
    shift_date: getDateString(1),
    shift_start: "08:00",
    shift_end: "16:00",
    position: "Security Guard",
    location: "Main Entrance",
    status: "scheduled",
    notes: null,
  },
  {
    id: "4",
    shift_date: getDateString(1),
    shift_start: "11:00",
    shift_end: "19:00",
    position: "Ride Operator",
    location: "Water Rides",
    status: "scheduled",
    notes: null,
  },
  {
    id: "5",
    shift_date: getDateString(2),
    shift_start: "09:00",
    shift_end: "17:00",
    position: "Maintenance",
    location: "Throughout Park",
    status: "scheduled",
    notes: "Regular inspection",
  },
  {
    id: "6",
    shift_date: getDateString(3),
    shift_start: "10:00",
    shift_end: "18:00",
    position: "Guest Services",
    location: "Information Desk",
    status: "scheduled",
    notes: null,
  },
]

const mockAnalytics = [
  { date: "2025-01-01", total_visitors: 1200, ticket_revenue: "24000", food_revenue: "8000", merch_revenue: "3000" },
  { date: "2025-01-02", total_visitors: 1500, ticket_revenue: "30000", food_revenue: "10000", merch_revenue: "4000" },
  { date: "2025-01-03", total_visitors: 1800, ticket_revenue: "36000", food_revenue: "12000", merch_revenue: "5000" },
  { date: "2025-01-04", total_visitors: 1400, ticket_revenue: "28000", food_revenue: "9000", merch_revenue: "3500" },
  { date: "2025-01-05", total_visitors: 2000, ticket_revenue: "40000", food_revenue: "14000", merch_revenue: "6000" },
  { date: "2025-01-06", total_visitors: 2200, ticket_revenue: "44000", food_revenue: "15000", merch_revenue: "6500" },
  { date: "2025-01-07", total_visitors: 1900, ticket_revenue: "38000", food_revenue: "13000", merch_revenue: "5500" },
]

export default function StaffDashboardPage() {
  const [activeTab, setActiveTab] = useState<"inventory" | "schedule" | "analytics">("inventory")

  // Calculate stats
  const totalItems = mockItems.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = mockItems.filter((item) => item.status === "low_stock").length
  const outOfStockCount = mockItems.filter((item) => item.status === "out_of_stock").length

  const totalVisitors = mockAnalytics.reduce((sum, day) => sum + day.total_visitors, 0)
  const totalRevenue = mockAnalytics.reduce((sum, day) => sum + Number.parseFloat(day.ticket_revenue), 0)
  const avgVisitors = Math.round(totalVisitors / mockAnalytics.length)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-primary">
                Sunshine Park Staff
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Website</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Staff Dashboard</h1>
          <p className="text-muted-foreground">Manage inventory, schedules, and view analytics</p>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 mb-8 border-b">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "inventory"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="w-5 h-5" />
            Inventory Management
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "schedule"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Staff Scheduling
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "analytics"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Reports & Analytics
          </button>
        </div>

        {/* Inventory Dashboard */}
        {activeTab === "inventory" && (
          <div>
            <StatsCards totalItems={totalItems} lowStockCount={lowStockCount} outOfStockCount={outOfStockCount} />
            <div className="mt-8">
              <InventoryTable items={mockItems} categories={mockCategories} />
            </div>
          </div>
        )}

        {/* Schedule Dashboard */}
        {activeTab === "schedule" && (
          <div>
            <ScheduleCalendar schedules={mockSchedules} userId="mock-user-id" />
          </div>
        )}

        {/* Analytics Dashboard */}
        {activeTab === "analytics" && (
          <div>
            <AnalyticsStats totalVisitors={totalVisitors} totalRevenue={totalRevenue} avgVisitors={avgVisitors} />
            <div className="mt-8">
              <AnalyticsCharts analytics={mockAnalytics} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
