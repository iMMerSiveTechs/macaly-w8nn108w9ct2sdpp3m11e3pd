import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nemurium - The Future of Immersive Creation',
  description: 'Create, connect, and publish immersive worlds with AI-powered tools. Built by iMMerSive Technologies.',
  keywords: 'VR, AR, immersive, 3D, world building, AI, mixed reality, metaverse',
  openGraph: {
    title: 'Nemurium - The Future of Immersive Creation',
    description: 'Create, connect, and publish immersive worlds with AI-powered tools.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Particle background */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        {children}
      </body>
    </html>
  )
}