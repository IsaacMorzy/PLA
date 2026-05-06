"use client";

import { ThemeProvider } from "next-themes";
import WalletContextProvider from "@/contexts/ContextProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <WalletContextProvider>{children}</WalletContextProvider>
    </ThemeProvider>
  );
}
