// components/landing/hero-images.tsx

import Link from "next/link"
import Image from "next/image"

export function HeroImages() {
    const examples = [
      {
        title: "Contact Form",
        image: "/examples/contact.png",
        link: "/templates/contact"
      },
      {
        title: "Job Application",
        image: "/examples/job.png", 
        link: "/templates/job"
      },
      {
        title: "Event Registration",
        image: "/examples/event.png",
        link: "/templates/event"
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Link 
            key={example.title}
            href={example.link}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="aspect-video relative">
              <Image
                src={example.image}
                alt={example.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-medium">
                {example.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }