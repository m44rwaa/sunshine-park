import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, MapPin, Utensils, ParkingCircle, Baby, Accessibility, Camera, Umbrella } from "lucide-react"

export default function VisitPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Plan Your Visit</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Everything you need to know for a perfect day at Sunshine Theme Park
              </p>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="container py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>Weekdays: 10 AM - 8 PM</p>
                <p>Weekends: 9 AM - 10 PM</p>
                <p>Holidays: 9 AM - 11 PM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>123 Sunshine Boulevard</p>
                <p>Bangkok 10110, Thailand</p>
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ParkingCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Parking</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Free parking available</p>
                <p>2,000+ spaces</p>
                <p>EV charging stations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Utensils className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Dining</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>15+ restaurants</p>
                <p>Food courts & kiosks</p>
                <p>Dietary options available</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Park Map */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Park Map</h2>
                <p className="text-muted-foreground">Interactive map of all attractions, dining, and facilities</p>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img src="/theme-park-map-with-rides-and-attractions.jpg" alt="Sunshine Theme Park Map" className="w-full" />
                </CardContent>
              </Card>
              <div className="text-center">
                <Button variant="outline" asChild>
                  <a href="/park-map.pdf" download>
                    Download PDF Map
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Park Amenities</h2>
              <p className="text-muted-foreground">We've thought of everything to make your visit comfortable</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Baby className="h-6 w-6 text-secondary" />
                    <CardTitle>Family Facilities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Baby care centers with changing stations</p>
                  <p>• Nursing rooms available</p>
                  <p>• Stroller rentals at entrance</p>
                  <p>• Family restrooms throughout park</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Accessibility className="h-6 w-6 text-secondary" />
                    <CardTitle>Accessibility</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Wheelchair accessible paths</p>
                  <p>• Wheelchair & mobility scooter rentals</p>
                  <p>• Priority access for guests with disabilities</p>
                  <p>• Accessible restrooms</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Camera className="h-6 w-6 text-secondary" />
                    <CardTitle>Photo Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Professional photographers at key locations</p>
                  <p>• Ride photo packages available</p>
                  <p>• Character photo opportunities</p>
                  <p>• Digital photo downloads</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Umbrella className="h-6 w-6 text-secondary" />
                    <CardTitle>Guest Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Lost and found service</p>
                  <p>• First aid stations</p>
                  <p>• Locker rentals</p>
                  <p>• ATMs and currency exchange</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Quick answers to common questions</p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What should I bring to the park?</AccordionTrigger>
                  <AccordionContent>
                    We recommend bringing sunscreen, comfortable walking shoes, a hat, and a refillable water bottle.
                    Lockers are available to store bags while you enjoy the rides.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I bring outside food and drinks?</AccordionTrigger>
                  <AccordionContent>
                    Outside food and drinks are not permitted except for baby food, special dietary needs, and sealed
                    water bottles. We have many dining options available throughout the park.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What happens if it rains?</AccordionTrigger>
                  <AccordionContent>
                    The park remains open during light rain. Some outdoor rides may temporarily close during heavy rain
                    or thunderstorms. We have many indoor attractions and covered areas. No refunds for weather-related
                    closures.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Are there height restrictions for rides?</AccordionTrigger>
                  <AccordionContent>
                    Yes, many rides have height and age restrictions for safety. Height requirements are clearly marked
                    at each attraction entrance. Measuring stations are available throughout the park.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is re-entry allowed?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can leave and re-enter the park on the same day. Please get your hand stamped at the exit
                    and keep your ticket for re-entry.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Do you offer group discounts?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer special group rates for parties of 15 or more. Please contact our group sales team at
                    groups@sunshinepark.com or call +66 2345 6789 ext. 2 for more information.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Visit?</h2>
            <p className="text-lg text-muted-foreground">Get your tickets now and plan your perfect day!</p>
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
