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
      <body className="min-h-screen overflow-hidden bg-[#120f0c] text-white">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.16),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(196,109,70,0.12),transparent_24%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center p-4">
          <div className="max-w-xl rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-10 text-center shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
              <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.643-1.154-1.834-2-3.05-2-.954 0-1.946.538-2.58 1.45L5.488 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="font-display text-4xl text-white">Something went wrong</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-8 text-white/62">
              We hit an unexpected issue while rendering the page. Try again and, if it persists, contact support.
            </p>
            {error?.digest ? <p className="mt-5 font-mono text-xs text-white/30">{error.digest}</p> : null}
            <button
              onClick={reset}
              className="mt-8 rounded-full bg-[#d4a853] px-6 py-3 font-medium text-[#17120d] transition duration-300 hover:bg-[#e5bc68]"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
