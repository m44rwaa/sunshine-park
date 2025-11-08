"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { AddShiftDialog } from "./add-shift-dialog"

interface Schedule {
  id: string
  shift_date: string
  shift_start: string
  shift_end: string
  position: string
  location: string
  status: string
  notes: string | null
}

interface ScheduleCalendarProps {
  schedules: Schedule[]
  userId: string
}

export function ScheduleCalendar({ schedules, userId }: ScheduleCalendarProps) {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Get the start of the current week
  const getWeekStart = (offset: number) => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Start on Monday
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() + diff + offset * 7)
    return weekStart
  }

  const weekStart = getWeekStart(currentWeekOffset)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return date
  })

  const getSchedulesForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return schedules.filter((s) => s.shift_date === dateStr)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="default" className="bg-blue-500">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Completed
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Schedule</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentWeekOffset(0)}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Shift
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((date, index) => {
              const daySchedules = getSchedulesForDate(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-3 min-h-[200px] ${
                    isToday ? "border-orange-500 bg-orange-50 dark:bg-orange-950" : ""
                  }`}
                >
                  <div className="font-medium text-sm mb-2">
                    <div className="text-muted-foreground">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className={isToday ? "text-orange-600 font-bold" : ""}>
                      {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {daySchedules.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No shifts</p>
                    ) : (
                      daySchedules.map((schedule) => (
                        <div key={schedule.id} className="bg-card border rounded p-2 text-xs">
                          <div className="font-medium mb-1">
                            {formatTime(schedule.shift_start)} - {formatTime(schedule.shift_end)}
                          </div>
                          <div className="text-muted-foreground mb-1">{schedule.position}</div>
                          <div className="text-muted-foreground mb-2">{schedule.location}</div>
                          {getStatusBadge(schedule.status)}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {showAddDialog && <AddShiftDialog userId={userId} onClose={() => setShowAddDialog(false)} />}
    </>
  )
}
