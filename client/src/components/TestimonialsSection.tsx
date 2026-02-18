import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Chief Information Officer",
    company: "MediCare Solutions",
    quote: "Ceyrva's assessment was incredibly thorough and practical. They identified critical gaps in our cloud security that we hadn't even considered. The remediation roadmap was clear and actionable—we implemented their recommendations within weeks.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Managing Partner",
    company: "Rodriguez & Associates Law Firm",
    quote: "As a professional services firm, compliance is everything. Ceyrva helped us prepare for our SOC 2 audit with confidence. Their guidance on access controls and documentation was invaluable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jennifer Park",
    title: "Founder & CEO",
    company: "TechVenture Startup",
    quote: "We needed security expertise without enterprise overhead. Ceyrva delivered exactly that—flexible advisory that scaled with our growth. Highly recommended for growing organizations.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What Our Clients Say</h2>
          <p className="text-lg text-foreground/70">
            Organizations across healthcare, professional services, and technology trust Ceyrva for security guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-foreground/70">{testimonial.title}</p>
                  <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
