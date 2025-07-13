/*
 * Nemurium Privacy Policy Page
 * Built by Nemurium AI Engine
 * Copyright (c) 2025 iMMerSive Technologies, LLC
 */

'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-gradient mb-4">Privacy Policy</h1>
          <p className="text-cosmic-white/70">Built by Nemurium AI Engine | Last Updated: July 2025</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Data Collection & Usage</h2>
            
            <h3 className="text-lg font-semibold text-cosmic-white mb-3">Information We Collect</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>Account information (email, username, profile data)</li>
              <li>Content you create (worlds, assets, prompts to AI)</li>
              <li>Usage analytics (page views, feature usage, performance metrics)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Communications (support emails, feedback, community posts)</li>
            </ul>

            <h3 className="text-lg font-semibold text-cosmic-white mb-3 mt-6">How We Use Your Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>Provide and improve Nemurium services</li>
              <li>Train and enhance AI models (anonymized data only)</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important platform updates and notifications</li>
              <li>Provide customer support and technical assistance</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">AI Training & Content Rights</h2>
            <div className="space-y-4 text-cosmic-white/80">
              <p><strong>AI Improvement:</strong> We use aggregated, anonymized data to improve our AI systems. Your specific creations remain private unless you choose to share them publicly.</p>
              <p><strong>Content Ownership:</strong> You retain full ownership of your created worlds and uploaded assets. We only use them to provide platform services.</p>
              <p><strong>Public Content:</strong> Content you mark as "public" may be featured in our gallery or used for promotional purposes with attribution.</p>
            </div>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Data Security & Protection</h2>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>All data encrypted in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication available</li>
              <li>GDPR and CCPA compliant data handling</li>
              <li>Secure cloud infrastructure (Firebase, Vercel)</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Your Rights & Controls</h2>
            <ul className="list-disc pl-6 space-y-2 text-cosmic-white/80">
              <li>Access and download all your data</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of analytics and marketing communications</li>
              <li>Request data correction or updates</li>
              <li>Control public visibility of your creations</li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Third-Party Services</h2>
            <div className="space-y-3 text-cosmic-white/80">
              <p><strong>Payment Processing:</strong> Stripe (secure payment handling)</p>
              <p><strong>Analytics:</strong> Privacy-focused analytics to improve user experience</p>
              <p><strong>AI Services:</strong> HuggingFace, OpenAI (for content generation)</p>
              <p><strong>Infrastructure:</strong> Firebase, Vercel (secure hosting and databases)</p>
            </div>
          </section>
        </div>

        <div className="text-center mt-12 p-6 bg-cosmic-purple/20 rounded-xl border border-cosmic-purple/30">
          <p className="text-sm text-cosmic-white/70 mb-2">
            <strong>Privacy Questions:</strong> privacy@nemurium.com
          </p>
          <p className="text-xs text-cosmic-white/50">
            Built by Nemurium AI Engine | © 2025 iMMerSive Technologies, LLC
          </p>
        </div>
      </div>
    </div>
  )
}