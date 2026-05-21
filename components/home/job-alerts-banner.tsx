"use client";

import { useState } from "react";
import { Bell, Mail } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function JobAlertsBanner() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setEmail("");
    toast.success("You're subscribed!", {
      description: "We'll send you weekly job alerts matching your interests.",
    });
  };

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 backdrop-blur-sm transition-all hover:border-accent/50">
        <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-accent">
          <Bell className="h-4 w-4" />
          Get job alerts in your inbox
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-white/20 bg-white/10 pl-10 text-white placeholder:text-slate-400"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-11 shrink-0 transition-transform active:scale-[0.98]"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
}
