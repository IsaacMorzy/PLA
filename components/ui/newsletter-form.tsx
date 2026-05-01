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
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          disabled={status === "loading"}
          className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-accent/50 border border-border/50 focus:border-[#d4a853]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a853]/20 transition-all disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 bg-[#d4a853] text-black rounded-xl font-medium text-sm hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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