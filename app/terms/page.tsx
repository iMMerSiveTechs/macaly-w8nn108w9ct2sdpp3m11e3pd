/*
 * Nemurium Terms of Service Page
 * Built by Nemurium AI Engine
 * Copyright (c) 2025 iMMerSive Technologies, LLC
 */

'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-cosmic-white/70 hover:text-cosmic-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Previous Page
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Terms of Service</h1>
          <p className="text-cosmic-white/70">Built by Nemurium AI Engine | Last Updated: July 2025</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Creator Rights & Platform Usage</h2>
            
            <h3 className="text-lg font-semibold text-cosmic-white mb-3">What You Own</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>All immersive worlds you create using Nemurium tools</li>
              <li>All assets you upload (3D models, audio, textures, etc.)</li>
              <li>All revenue generated from your realm ticketing and tips</li>
              <li>Your creator profile and associated content</li>
            </ul>

            <h3 className="text-lg font-semibold text-cosmic-white mb-3 mt-6">Platform Ownership</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>The Nemurium platform, AI engines, and core technology</li>
              <li>All proprietary algorithms for world generation and asset processing</li>
              <li>Platform infrastructure, databases, and hosting systems</li>
              <li>The "Nemurium" brand, logo, and associated trademarks</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">AI-Generated Content Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>Content generated using Nemurium's AI tools may be used freely by creators</li>
              <li>Nemurium retains rights to improve AI systems using aggregated data</li>
              <li>Creators cannot claim exclusive ownership of pure AI-generated outputs</li>
              <li>Human creative input + AI assistance = creator-owned content</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Monetization Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>Nemurium takes 5% of gross revenue from realm sales and ticketing</li>
              <li>Tips and donations: 3% platform fee</li>
              <li>Asset marketplace: 15% commission on sales</li>
              <li>Subscription revenue: Split according to creator tier agreement</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Prohibited Uses</h2>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>Creating content that violates copyright or trademark laws</li>
              <li>Uploading malicious code or harmful software</li>
              <li>Attempting to reverse-engineer Nemurium's AI systems</li>
              <li>Selling or redistributing Nemurium's core technology</li>
              <li>Creating competing platforms using Nemurium tools</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Legal Protection</h2>
            <div className="text-cosmic-white/80 space-y-3">
              <p><strong>Copyright Notice:</strong> This platform and all associated code, designs, and algorithms are protected by copyright law.</p>
              <p><strong>Trademark Notice:</strong> Nemurium® and associated marks are trademarks of iMMerSive Technologies, LLC.</p>
              <p><strong>Trade Secret Protection:</strong> Core AI algorithms and business logic are protected as trade secrets.</p>
              <p><strong>Enforcement:</strong> Violations will result in immediate account termination and legal action.</p>
            </div>
          </section>
        </div>

        <div className="text-center mt-12 p-6 bg-cosmic-purple/20 rounded-xl border border-cosmic-purple/30">
          <p className="text-sm text-cosmic-white/70 mb-2">
            <strong>Contact Legal Team:</strong> legal@nemurium.com
          </p>
          <p className="text-xs text-cosmic-white/50">
            Built by Nemurium AI Engine | © 2025 iMMerSive Technologies, LLC
          </p>
        </div>
      </div>
    </div>
  )
}