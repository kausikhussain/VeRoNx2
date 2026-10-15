import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";

export const metadata: Metadata = {
  title: { default: "VeRoN — Virtual Styling Studio", template: "%s | VeRoN" },
  description: "VeRoN Premium Virtual Styling Studio. Try every layer and discover curated outfits live.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
