"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Package } from "lucide-react"
import { RestockDialog } from "./restock-dialog"
import { AddItemDialog } from "./add-item-dialog"

interface InventoryItem {
  id: string
  name: string
  description: string | null
  quantity: number
  min_quantity: number
  unit: string
  status: string
  inventory_categories: {
    name: string
  } | null
}

interface InventoryCategory {
  id: string
  name: string
  description: string | null
}

interface InventoryTableProps {
  items: InventoryItem[]
  categories: InventoryCategory[]
}

export function InventoryTable({ items, categories }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.inventory_categories?.name === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  function getStatusBadge(status: string) {
    switch (status) {
      case "in_stock":
        return (
          <Badge variant="default" className="bg-green-500">
            In Stock
          </Badge>
        )
      case "low_stock":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Low Stock
          </Badge>
        )
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Manage park inventory and supplies</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium">Item</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Category</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Quantity</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No items found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            {item.description && (
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{item.inventory_categories?.name || "Uncategorized"}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            {item.quantity} {item.unit}
                            <div className="text-xs text-muted-foreground">Min: {item.min_quantity}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="outline" onClick={() => setSelectedItem(item)}>
                            Restock
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedItem && <RestockDialog item={selectedItem} onClose={() => setSelectedItem(null)} />}

      {showAddDialog && <AddItemDialog categories={categories} onClose={() => setShowAddDialog(false)} />}
    </>
  )
}
