import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConnectionBanner from "@/components/ConnectionBanner";

// Fonts are loaded via a standard <link> tag (see below) rather than
// next/font/google, so the production build never depends on reaching
// fonts.googleapis.com at build time — only the visitor's browser fetches
// them at runtime, same as any normal web font. If Google Fonts is
// unreachable, the CSS fallback stack (see tailwind.config.ts) still
// renders a clean serif/sans pairing.

export const metadata: Metadata = {
  title: "Dr. B. R. Ambedkar Digital Heritage Archive",
  description:
    "Explore the writings, speeches, ideas and legacy of Dr. B. R. Ambedkar through an AI-powered digital archive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-parchment text-ink antialiased">
        <Navigation />
        <ConnectionBanner />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
