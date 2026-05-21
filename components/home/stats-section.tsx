"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, Users } from "lucide-react";

const stats = [
  { label: "Jobs", value: 10000, suffix: "+", icon: Briefcase },
  { label: "Companies", value: 5000, suffix: "+", icon: Building2 },
  { label: "Job Seekers", value: 1000000, suffix: "+", icon: Users, format: "compact" as const },
];

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-border bg-muted/30 py-14 transition-opacity duration-700"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                active={visible}
                compact={stat.format === "compact"}
              />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnimatedCounter({
  target,
  suffix,
  active,
  compact,
}: {
  target: number;
  suffix: string;
  active: boolean;
  compact?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, target]);

  const display = compact
    ? count >= 1000000
      ? "1M"
      : count >= 1000
        ? `${Math.floor(count / 1000)}K`
        : count.toLocaleString()
    : count.toLocaleString();

  return (
    <>
      {display}
      {suffix}
    </>
  );
}
