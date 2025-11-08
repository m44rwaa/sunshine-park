import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CalendarDays, Gift, Sparkles, Users, Heart, Star } from "lucide-react"

const PROMOTIONS = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "Book tickets 7 days in advance and save 20%",
    discount: "20% OFF",
    validUntil: "Valid through March 2025",
    icon: CalendarDays,
    color: "bg-primary/10 text-primary",
    terms: ["Must book minimum 7 days in advance", "Non-refundable", "Valid weekdays only"],
  },
  {
    id: 2,
    title: "Birthday Celebration",
    description: "Free entry for birthday guests with valid ID",
    discount: "FREE ENTRY",
    validUntil: "Valid on your birthday + 3 days",
    icon: Gift,
    color: "bg-accent/10 text-accent",
    terms: ["Must present valid ID", "One free ticket per birthday", "Bring 3+ paying guests"],
  },
  {
    id: 3,
    title: "Weekend Family Pass",
    description: "Special weekend rates for families of 4+",
    discount: "15% OFF",
    validUntil: "Every weekend",
    icon: Users,
    color: "bg-secondary/10 text-secondary",
    terms: ["Minimum 4 tickets", "Weekends only", "Cannot combine with other offers"],
  },
  {
    id: 4,
    title: "Student Discount",
    description: "Students save on weekday visits",
    discount: "25% OFF",
    validUntil: "Valid year-round",
    icon: Star,
    color: "bg-primary/10 text-primary",
    terms: ["Valid student ID required", "Weekdays only", "Ages 13-25"],
  },
  {
    id: 5,
    title: "Senior Special",
    description: "Exclusive discounts for seniors 60+",
    discount: "30% OFF",
    validUntil: "Valid year-round",
    icon: Heart,
    color: "bg-accent/10 text-accent",
    terms: ["Ages 60 and above", "Valid ID required", "Any day of the week"],
  },
  {
    id: 6,
    title: "Season Pass",
    description: "Unlimited visits for 365 days",
    discount: "BEST VALUE",
    validUntil: "Valid for 1 year from purchase",
    icon: Sparkles,
    color: "bg-secondary/10 text-secondary",
    terms: ["Unlimited park entry", "Exclusive perks", "Payment plans available"],
  },
]

export default function PromotionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <Badge className="mb-2" variant="secondary">
                Limited Time Offers
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Special Promotions & Deals</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Save big on your Sunshine Theme Park adventure with our exclusive offers and promotions
              </p>
            </div>
          </div>
        </section>

        {/* Promotions Grid */}
        <section className="container py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROMOTIONS.map((promo) => {
              const Icon = promo.icon
              return (
                <Card key={promo.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${promo.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{promo.title}</CardTitle>
                    <CardDescription>{promo.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="inline-block">
                        <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                          {promo.discount}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{promo.validUntil}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium">Terms & Conditions:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {promo.terms.map((term, idx) => (
                          <li key={idx}>• {term}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/tickets" className="w-full">
                      <Button className="w-full">Claim Offer</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Stay Updated on Exclusive Deals</CardTitle>
                  <CardDescription>
                    Subscribe to our newsletter and be the first to know about new promotions, events, and special
                    offers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button type="submit" className="sm:w-auto">
                      Subscribe
                    </Button>
                  </form>
                  <p className="mt-3 text-xs text-center text-muted-foreground">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Group Bookings */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <img src="/large-group-of-people-having-fun-at-theme-park.jpg" alt="Group bookings" className="h-full w-full object-cover" />
                </div>
                <div className="order-1 md:order-2 p-8 flex flex-col justify-center space-y-4">
                  <div>
                    <Badge className="mb-3">Corporate & Groups</Badge>
                    <h3 className="text-2xl font-bold mb-2">Planning a Group Visit?</h3>
                    <p className="text-muted-foreground">
                      Special rates for groups of 15 or more. Perfect for schools, companies, and organizations.
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Dedicated group coordinator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Customized packages available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Private dining options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">✓</span>
                      <span>Flexible payment terms</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <a href="mailto:groups@sunshinepark.com">Contact Group Sales</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold">Don't Miss Out on These Amazing Deals!</h2>
            <p className="text-lg text-muted-foreground">
              Book your tickets today and start saving on your Sunshine Theme Park adventure
            </p>
            <Link href="/tickets">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
                Buy Tickets Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
