"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface RestockDialogProps {
  item: {
    id: string
    name: string
    quantity: number
    unit: string
  }
  onClose: () => void
}

export function RestockDialog({ item, onClose }: RestockDialogProps) {
  const [quantity, setQuantity] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleRestock() {
    if (!quantity || Number.parseInt(quantity) <= 0) return

    setIsLoading(true)
    const supabase = getSupabaseBrowserClient()

    const quantityChange = Number.parseInt(quantity)
    const newQuantity = item.quantity + quantityChange

    // Update item quantity
    const { error: updateError } = await supabase
      .from("inventory_items")
      .update({
        quantity: newQuantity,
        last_restocked: new Date().toISOString(),
      })
      .eq("id", item.id)

    if (updateError) {
      console.error("Error updating inventory:", updateError)
      setIsLoading(false)
      return
    }

    // Record transaction
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("inventory_transactions").insert({
      item_id: item.id,
      user_id: user?.id,
      transaction_type: "restock",
      quantity_change: quantityChange,
      quantity_after: newQuantity,
      notes: notes || null,
    })

    setIsLoading(false)
    router.refresh()
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restock Item</DialogTitle>
          <DialogDescription>Add inventory for {item.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Current Quantity</Label>
            <p className="text-sm text-muted-foreground">
              {item.quantity} {item.unit}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity to Add</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={`Enter ${item.unit} to add`}
            />
          </div>

          {quantity && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">
                New Quantity: {item.quantity + Number.parseInt(quantity)} {item.unit}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this restock..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleRestock} disabled={isLoading || !quantity}>
            {isLoading ? "Restocking..." : "Restock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
