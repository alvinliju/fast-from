import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "FREE",
    subtitle: "Perfect for trying out FastForm.",
    price: "Free forever",
    features: ["Unlimited forms", "100 responses/month", "Basic question types", "CSV export"],
    cta: "Get started",
    popular: false,
  },
  {
    name: "PRO",
    subtitle: "For teams and businesses that need more.",
    price: "$15/month",
    features: ["Everything in Free", "Unlimited responses", "File uploads", "Remove branding", "Priority support"],
    cta: "Try it free for 30 days",
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            Simple, honest pricing
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {plans.map((plan, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 relative min-h-[500px] flex flex-col">
                {/* Yellow accent banner for plan name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-foreground mb-2">
                    FastForm{" "}
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded transform -rotate-1 inline-block font-black">
                      {plan.name}
                    </span>
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium">{plan.subtitle}</p>
                </div>

                {/* Features list */}
                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-foreground mr-3 font-bold">•</span>
                        <span className="text-base text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing and CTA at bottom */}
                <div className="mt-auto">
                  <div className="mb-6">
                    <div className="text-3xl font-black text-foreground mb-2">{plan.price}</div>
                    {plan.name === "PRO" && (
                      <p className="text-sm text-muted-foreground">Billed monthly. Cancel anytime.</p>
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="w-full text-base font-bold py-3 h-auto bg-green-600 hover:bg-green-700 text-white"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
