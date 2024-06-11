import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@components/navigation";
import NAVIGATION from "@constants/navigation";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <header>
          <Navigation links={NAVIGATION} />
        </header>
        {children}
      </body>
    </html>
  );
}
