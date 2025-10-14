export function FeaturesSection() {
  const features = [
    {
      title: "Beautiful by default",
      description: "Every form looks professional from the start. No design skills required. Your forms will look better than the competition without even trying.",
      highlighted: true,
    },
    {
      title: "Simple by design",
      description: "Create beautiful forms in seconds. No learning curve. No complexity. Just the form builder you wish existed.",
      highlighted: false,
    },
    {
      title: "Built for speed",
      description: "Click to add a question. Type to edit. That's it. No tutorials needed. No complex settings. Just the form builder you wish existed.",
      highlighted: false,
    },
  ]

  return (
    <section className="py-12">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 flex flex-col gap-2"
            >
              {feature.highlighted && (
                <div className="space-y-1 mb-2">
                  <div className="w-full h-0.5 bg-[#322d2b]/8"></div>
                  <div className="w-32 h-0.5 bg-[#322d2b]"></div>
                </div>
              )}
              <h3 className="text-[#49423d] text-sm font-semibold leading-6">{feature.title}</h3>
              <p className="text-[#605a57] text-sm leading-[22px] whitespace-pre-line">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
