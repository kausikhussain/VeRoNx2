import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";
export const metadata: Metadata = { title: { default: "AURELIA — Modern Luxury", template: "%s | AURELIA" }, description: "A modern luxury wardrobe, made to be tried on." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
