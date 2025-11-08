"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/sunshine-park-logo.png"
            alt="Sunshine Park Logo"
            width={120}
            height={48}
            className="h-12 w-auto"
          />
          <span className="text-2xl font-serif font-bold text-[#F59E0B]">Sunshine Park</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tickets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Buy Tickets
          </Link>
          <Link href="/visit" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Plan Your Visit
          </Link>
          <Link href="/promotions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Promotions
          </Link>
        </nav>

        {/* Login Button - Right Side */}
        <Link href="/login" className="hidden md:block">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tickets"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy Tickets
            </Link>
            <Link
              href="/visit"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Plan Your Visit
            </Link>
            <Link
              href="/promotions"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Promotions
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
