"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, Clock, Phone, Mail, Ticket, Users, Utensils } from "lucide-react"

function RollerCoaster() {
  return (
    <group>
      {/* Track supports */}
      <mesh position={[-3, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -3]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Roller coaster tracks - curved path */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(angle * 2) * 2 + 2

        return (
          <group key={i}>
            {/* Left rail */}
            <mesh position={[x - 0.3, y, z]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.5]} />
              <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Right rail */}
            <mesh position={[x + 0.3, y, z]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.5]} />
              <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Cross beam */}
            <mesh position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.6, 0.05, 0.05]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        )
      })}

      {/* Roller coaster car */}
      <group position={[3, 4, 0]}>
        <mesh>
          <boxGeometry args={[1, 0.8, 1.5]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.9, 0.4, 1.4]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Wheels */}
        <mesh position={[-0.4, -0.5, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.4, -0.5, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.4, -0.5, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.4, -0.5, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Ground platform */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/colorful-theme-park-with-rides-and-attractions-sun.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>

          <div className="container relative py-24 md:py-32 lg:py-40">
            <div className="mx-auto max-w-4xl text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                  Welcome to Sunshine Theme Park!
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-white/90 text-balance md:text-xl drop-shadow-md">
                  Experience a full day of fun, excitement, and unforgettable memories with 40+ rides, games, and dining
                  options for the whole family.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/tickets">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                  >
                    Buy Tickets Now
                  </Button>
                </Link>
                <Link href="/visit">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-lg px-8 py-6 bg-white/90 hover:bg-white text-foreground"
                  >
                    Plan Your Visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Ticket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">40+ Attractions</h3>
                <p className="text-sm text-muted-foreground">
                  From thrilling roller coasters to family-friendly rides, there's something for everyone
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary/50 transition-colors">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Family Fun</h3>
                <p className="text-sm text-muted-foreground">
                  Create lasting memories with activities designed for all ages
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Utensils className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Dining Options</h3>
                <p className="text-sm text-muted-foreground">
                  Delicious food and beverages available throughout the park
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Bangkok's Favorite Family Destination</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sunshine Theme Park is Bangkok's premier entertainment destination, offering over 40 thrilling rides,
                  exciting games, and diverse dining options. Whether you're seeking adrenaline-pumping adventures or
                  gentle family experiences, our park provides unforgettable moments for visitors of all ages.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="flex items-start gap-3 p-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Bangkok, Thailand</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-3 p-4">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Operating Hours</p>
                      <p className="text-sm text-muted-foreground">Weekdays: 10 AM - 8 PM</p>
                      <p className="text-sm text-muted-foreground">Weekends: 9 AM - 10 PM</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-3 p-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+6623456789"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +66 2345 6789
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-3 p-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:info@sunshinepark.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@sunshinepark.com
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready for an Adventure?</h2>
            <p className="text-lg text-muted-foreground">
              Get your tickets today and start planning your perfect day at Sunshine Theme Park!
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
