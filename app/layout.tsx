import { Toaster } from "sonner";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "PeaceLeague Africa | Transparent Giving on Solana",
  description: "Decentralized crowdfunding for African causes. 100% transparent, peer-to-peer donations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-brand-charcoal text-white antialiased dark-mode font-sans"
        suppressHydrationWarning
      >
        <Providers>
          {/* Grain texture overlay - fixed z-index for depth */}
          <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.025] noise-overlay" />
          {/* Vignette effect for depth */}
          <div className="fixed inset-0 pointer-events-none z-[9997] bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
