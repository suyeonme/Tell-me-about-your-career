import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Navigation } from "@components";
import NAVIGATION from "@constants/navigation";

export const metadata: Metadata = {
  title: "Tell me about your career",
  description: "A simple platform where people can explore various jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <header>
          <Navigation links={NAVIGATION} logoSrc="/logo-2.svg" />
        </header>
        {children}
      </body>
    </html>
  );
}
