import type { Metadata } from "next";

import "./globals.css";
import { Navigation } from "@components";
import NAVIGATION from "@meta/navigation";
import { AuthProvider } from "@context/AuthContext";
import ReactQueryProvider from "@api/utils/reactQuery/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Tell me about your career",
  description: "A simple platform where people can explore various jobs.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <header>
          <Navigation links={NAVIGATION} logoSrc="/logo-2.svg" />
        </header>

        <ReactQueryProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
