"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CTAProps {
  badge?: {
    text: string
  }
  title: string
  description?: string
  action: {
    text: string
    href: string
    variant?: "default" | "glow"
  }
  withGlow?: boolean
  className?: string
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = true,
  className,
}: CTAProps) {
  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        {/* Badge */}
        {badge && (
          <Badge
            variant="outline"
            className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-100"
          >
            <span className="text-muted-foreground">{badge.text}</span>
          </Badge>
        )}

        {/* Title */}
        <h2 className="text-3xl font-semibold sm:text-5xl animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-200">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-muted-foreground animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-300">
            {description}
          </p>
        )}

        {/* Action Button */}
        <Button
          variant={action.variant || "default"}
          size="lg"
          className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-500"
          asChild
        >
          <a href={action.href}>{action.text}</a>
        </Button>

        {/* Always Visible Glow Effect - No Animation */}
        {withGlow && (
          <div 
            className="pointer-events-none absolute inset-0 rounded-5xl opacity-12"
            style={{
              background: 'radial-gradient(circle at 10% 10%, rgba(107, 114, 128, 0.3) 0%, rgba(107, 114, 128, 0.1) 30%, transparent 300%)',
              filter: 'blur(1px)',
              boxShadow: `
                inset 0 0 60px rgba(59, 130, 246, 0.1),
                0 0 60px rgba(59, 130, 246, 0.2),
                0 0 100px rgba(59, 130, 246, 0.15),
                0 0 200px rgba(59, 130, 246, 0.1)
              `
            }}
          />
        )}

        {/* Additional outer glow */}
        {withGlow && (
          <div 
            className="pointer-events-none absolute -inset-4 rounded-3xl"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
              filter: 'blur(2px)'
            }}
          />
        )}
      </div>
    </section>
  )
}
