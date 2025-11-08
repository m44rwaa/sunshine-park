import Link from "next/link"
import { Facebook, Instagram, Music } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span>📍</span>
                <span>Sunshine Theme Park, Bangkok, Thailand</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@sunshinepark.com" className="hover:text-primary transition-colors">
                  info@sunshinepark.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>☎</span>
                <a href="tel:+6623456789" className="hover:text-primary transition-colors">
                  +66 2345 6789
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/tickets" className="hover:text-primary transition-colors">
                Buy Tickets
              </Link>
              <Link href="/visit" className="hover:text-primary transition-colors">
                Plan Your Visit
              </Link>
              <Link href="/promotions" className="hover:text-primary transition-colors">
                Promotions
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Sunshine Theme Park. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
