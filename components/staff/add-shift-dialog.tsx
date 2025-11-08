"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface AddShiftDialogProps {
  userId: string
  onClose: () => void
}

export function AddShiftDialog({ userId, onClose }: AddShiftDialogProps) {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [position, setPosition] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleAdd() {
    if (!date || !startTime || !endTime || !position || !location) return

    setIsLoading(true)
    const supabase = getSupabaseBrowserClient()

    const { error } = await supabase.from("staff_schedules").insert({
      user_id: userId,
      shift_date: date,
      shift_start: startTime,
      shift_end: endTime,
      position,
      location,
      notes: notes || null,
      status: "scheduled",
    })

    if (error) {
      console.error("Error adding shift:", error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    router.refresh()
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Shift</DialogTitle>
          <DialogDescription>Schedule a new shift</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ride Operator">Ride Operator</SelectItem>
                <SelectItem value="Guest Services">Guest Services</SelectItem>
                <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                <SelectItem value="Ticket Sales">Ticket Sales</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Entrance">Main Entrance</SelectItem>
                <SelectItem value="Rides Area">Rides Area</SelectItem>
                <SelectItem value="Food Court">Food Court</SelectItem>
                <SelectItem value="Parking Lot">Parking Lot</SelectItem>
                <SelectItem value="Gift Shop">Gift Shop</SelectItem>
                <SelectItem value="Water Park">Water Park</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={isLoading || !date || !startTime || !endTime || !position || !location}>
            {isLoading ? "Adding..." : "Add Shift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
