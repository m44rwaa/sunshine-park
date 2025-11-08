"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, Minus, Plus, ShoppingCart, CreditCard, Download, CheckCircle } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import QRCode from "react-qr-code"

const TICKET_TYPES = [
  {
    id: "adult",
    name: "Adult Ticket",
    description: "Ages 13 and above",
    price: 599,
    features: ["All rides and attractions", "Park map included", "Valid for one day"],
  },
  {
    id: "child",
    name: "Child Ticket",
    description: "Ages 3-12",
    price: 399,
    features: ["All rides and attractions", "Park map included", "Valid for one day"],
  },
  {
    id: "senior",
    name: "Senior Ticket",
    description: "Ages 60 and above",
    price: 449,
    features: ["All rides and attractions", "Park map included", "Valid for one day"],
  },
  {
    id: "family",
    name: "Family Pass",
    description: "2 Adults + 2 Children",
    price: 1699,
    features: ["All rides and attractions", "Park map included", "Valid for one day", "Save 15%"],
  },
]

export default function TicketsPage() {
  const [step, setStep] = useState<"select" | "payment" | "confirmation">("select")
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({})
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [orderId, setOrderId] = useState("")

  const updateTicketQuantity = (ticketId: string, change: number) => {
    setSelectedTickets((prev) => {
      const currentQty = prev[ticketId] || 0
      const newQty = Math.max(0, Math.min(10, currentQty + change))
      if (newQty === 0) {
        const { [ticketId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [ticketId]: newQty }
    })
  }

  const getTotalAmount = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = TICKET_TYPES.find((t) => t.id === ticketId)
      return total + (ticket?.price || 0) * quantity
    }, 0)
  }

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0)
  }

  const handleCheckout = () => {
    if (getTotalTickets() === 0) {
      alert("Please select at least one ticket")
      return
    }
    if (!visitDate) {
      alert("Please select a visit date")
      return
    }
    if (!email || !phone) {
      alert("Please provide your contact information")
      return
    }
    setStep("payment")
  }

  const handlePayment = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert("Please fill in all payment details")
      return
    }

    // Generate a unique order ID
    const newOrderId = `SP${Date.now()}${Math.random().toString(36).substring(7).toUpperCase()}`
    setOrderId(newOrderId)
    setStep("confirmation")
  }

  const handleDownloadTicket = () => {
    const ticketData = {
      orderId,
      date: visitDate ? format(visitDate, "PPP") : "",
      tickets: selectedTickets,
      total: getTotalAmount(),
      email,
    }

    const blob = new Blob([JSON.stringify(ticketData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sunshine-park-ticket-${orderId}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
                {step === "select" && "Buy Your Tickets"}
                {step === "payment" && "Payment Details"}
                {step === "confirmation" && "Booking Confirmed!"}
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                {step === "select" &&
                  "Select your tickets, choose your date, and get ready for an unforgettable adventure!"}
                {step === "payment" && "Enter your payment information to complete your purchase"}
                {step === "confirmation" && "Your tickets are ready! Show the QR code at the park entrance"}
              </p>
            </div>
          </div>
        </section>

        {step === "select" && (
          <section className="container py-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Ticket Options */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Select Your Tickets</h2>
                  <p className="text-muted-foreground">Choose the ticket type and quantity for your visit</p>
                </div>

                <div className="grid gap-4">
                  {TICKET_TYPES.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <CardTitle>{ticket.name}</CardTitle>
                            <CardDescription>{ticket.description}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">฿{ticket.price}</div>
                            <div className="text-xs text-muted-foreground">per person</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {ticket.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-secondary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="bg-muted/30">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center gap-3">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateTicketQuantity(ticket.id, -1)}
                              disabled={!selectedTickets[ticket.id]}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{selectedTickets[ticket.id] || 0}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateTicketQuantity(ticket.id, 1)}
                              disabled={selectedTickets[ticket.id] >= 10}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Visit Date */}
                    <div className="space-y-2">
                      <Label>Visit Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !visitDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {visitDate ? format(visitDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={visitDate}
                            onSelect={setVisitDate}
                            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+66 XX XXX XXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Selected Tickets */}
                    {getTotalTickets() > 0 ? (
                      <div className="space-y-3">
                        <div className="text-sm font-medium">Selected Tickets:</div>
                        <div className="space-y-2">
                          {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                            const ticket = TICKET_TYPES.find((t) => t.id === ticketId)
                            if (!ticket) return null
                            return (
                              <div key={ticketId} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {ticket.name} × {quantity}
                                </span>
                                <span className="font-medium">฿{(ticket.price * quantity).toLocaleString()}</span>
                              </div>
                            )
                          })}
                        </div>
                        <div className="border-t pt-3 flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-primary">฿{getTotalAmount().toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-sm text-muted-foreground">No tickets selected yet</div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleCheckout} disabled={getTotalTickets() === 0}>
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {step === "payment" && (
          <section className="container py-12 md:py-16">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>Enter your card details to complete the purchase</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                    <h3 className="font-semibold">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visit Date:</span>
                        <span className="font-medium">{visitDate ? format(visitDate, "PPP") : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Tickets:</span>
                        <span className="font-medium">{getTotalTickets()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-xl font-bold text-primary">฿{getTotalAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={3}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-2 p-3 bg-secondary/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                    <div className="text-sm space-y-1">
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-muted-foreground text-xs">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handlePayment} className="flex-1" size="lg">
                    Complete Payment - ฿{getTotalAmount().toLocaleString()}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        )}

        {step === "confirmation" && (
          <section className="container py-12 md:py-16">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                  <CardDescription>
                    Your tickets have been confirmed. Show this QR code at the park entrance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-4 p-8 bg-muted/30 rounded-lg">
                    <div className="bg-white p-4 rounded-lg">
                      <QRCode
                        value={JSON.stringify({
                          orderId,
                          date: visitDate ? format(visitDate, "yyyy-MM-dd") : "",
                          tickets: getTotalTickets(),
                          amount: getTotalAmount(),
                        })}
                        size={200}
                      />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-semibold">Order ID: {orderId}</p>
                      <p className="text-sm text-muted-foreground">Scan this code at park entrance</p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Booking Details</h3>
                    <div className="grid gap-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Visit Date</span>
                        <span className="font-medium">{visitDate ? format(visitDate, "PPP") : "N/A"}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium">{email}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{phone}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Total Tickets</span>
                        <span className="font-medium">{getTotalTickets()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Total Paid</span>
                        <span className="text-xl font-bold text-primary">฿{getTotalAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Breakdown */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Your Tickets</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                        const ticket = TICKET_TYPES.find((t) => t.id === ticketId)
                        if (!ticket) return null
                        return (
                          <div
                            key={ticketId}
                            className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded"
                          >
                            <span className="font-medium">{ticket.name}</span>
                            <span className="text-muted-foreground">× {quantity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button onClick={handleDownloadTicket} size="lg" className="w-full">
                    <Download className="mr-2 h-5 w-5" />
                    Download E-Ticket
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    A confirmation email has been sent to {email}
                  </p>
                </CardFooter>
              </Card>
            </div>
          </section>
        )}

        {/* Important Info - Only show on select step */}
        {step === "select" && (
          <section className="bg-muted/30 py-12 md:py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl space-y-6">
                <h2 className="text-2xl font-bold">Important Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Ticket Validity</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>All tickets are valid for one day only on the selected date. No refunds or exchanges.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Age Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>Children under 3 years old enter free. ID verification may be required at entry.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Operating Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>Weekdays: 10 AM - 8 PM. Weekends & Holidays: 9 AM - 10 PM.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Support</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>Questions? Call +66 2345 6789 or email info@sunshinepark.com</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
