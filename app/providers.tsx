"use client";

import { ThemeProvider } from "next-themes";
import WalletContextProvider from "@/contexts/ContextProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

// PeaceLeague Africa - Locked to dark mode for premium aesthetic
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <WalletContextProvider>{children}</WalletContextProvider>
    </ThemeProvider>
  );
}
