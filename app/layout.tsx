import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCProvider } from "@/src/trpc/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Nemurium - Immersive Creation Platform',
  description: 'Build and monetize interactive 3D realms in mixed reality. No code, no limits.',
  keywords: 'VR, AR, 3D, world building, metaverse, spatial computing, immersive creation',
  // Force deployment refresh - 2025-07-11
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </body>
    </html>
  );
}