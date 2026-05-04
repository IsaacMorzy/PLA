"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-green-400 text-sm ${className}`}>
        <CheckCircle2 className="w-4 h-4" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#d4a853]">
        Stay Updated
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          disabled={status === "loading"}
          className="flex-1 rounded-full border border-border/50 bg-accent/50 px-4 py-3 text-sm focus:border-[#d4a853]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a853]/20 transition-all disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-[#d4a853] px-5 py-3 text-sm font-medium text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
