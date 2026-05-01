"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[#1a1815] flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.643-1.154-1.834-2-3.05-2-.954 0-1.946.538-2.58 1.45L5.488 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-white/60 mb-6">
            We encountered an unexpected error. Please try again.
          </p>
          {error?.digest && (
            <p className="text-xs text-white/30 font-mono mb-4">
              {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#d4a853] text-black font-medium rounded-xl hover:brightness-110 transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}