// components/home/testimonials-section.tsx
// Candidate success stories / testimonials section

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Engineer",
    company: "Zomato",
    avatar: "PS",
    avatarBg: "bg-accent",
    rating: 5,
    text: "TalentFlow made my job search so effortless. I applied to Zomato through the platform, heard back within 3 days, and got an offer in under 2 weeks. The filter system is incredibly precise — I found exactly the React roles I was looking for.",
  },
  {
    name: "Arjun Mehta",
    role: "Data Engineer",
    company: "Flipkart",
    avatar: "AM",
    avatarBg: "bg-emerald-600",
    rating: 5,
    text: "As someone with 4 years of experience, I needed a platform that understood my level. TalentFlow's experience filter cut through the noise and showed me senior-level data engineering roles at top product companies. Landed my dream job!",
  },
  {
    name: "Sneha Reddy",
    role: "UX Designer",
    company: "Swiggy",
    avatar: "SR",
    avatarBg: "bg-purple-600",
    rating: 5,
    text: "The company profiles and job detail pages gave me everything I needed to research before applying. I could see the team culture, tech stack, and notice period expectations all in one place. The application process was a breeze.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Success Stories</h2>
          <p className="mt-2 text-muted-foreground">
            Real people. Real jobs. Real careers built on TalentFlow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, company, avatar, avatarBg, rating, text }) => (
            <div
              key={name}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <StarRating count={rating} />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${avatarBg} text-sm font-bold text-white`}
                >
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {role} at {company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
