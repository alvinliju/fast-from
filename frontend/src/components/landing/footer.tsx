import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-lg font-black text-foreground tracking-tight">
              FastForm
            </Link>
            <span className="text-sm text-muted-foreground">
              is designed, built, and backed by developers who hate complex forms.
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/updates" className="text-muted-foreground hover:text-foreground transition-colors">
              Updates
            </Link>
            <Link href="/status" className="text-muted-foreground hover:text-foreground transition-colors">
              Status
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-muted-foreground">© 2025 FastForm</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
