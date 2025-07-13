"use client"

import { useState } from 'react';

interface Tier {
  id: string;
  name: string;
  price: number;
  features: string[];
  generationLimit: number;
  popular?: boolean;
  licenseAccess?: boolean;
}

const tiers: Tier[] = [
  {
    id: 'bronze',
    name: 'Bronze Creator',
    price: 20,
    generationLimit: 25,
    features: [
      '25 AI generations/month',
      'Basic asset library access',
      'Community support',
      'Standard export formats'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Builder',
    price: 50,
    generationLimit: 75,
    popular: true,
    features: [
      '75 AI generations/month',
      'Premium asset library',
      'Priority support',
      'Advanced export options',
      'Collaboration tools'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Architect',
    price: 100,
    generationLimit: 200,
    features: [
      '200 AI generations/month',
      'Full asset library access',
      'VIP support',
      'Commercial licensing',
      'Advanced collaboration',
      'Custom branding'
    ]
  },
  {
    id: 'master',
    name: 'Master Creator',
    price: 199,
    generationLimit: 500,
    licenseAccess: true,
    features: [
      '500 AI generations/month',
      'Unlimited asset access',
      'Dedicated support',
      'IP ownership rights',
      'White-label options',
      'Revenue sharing',
      'Early access features'
    ]
  }
];

export default function StripePricingTiers() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (tierId: string) => {
    setIsLoading(tierId);
    console.log(`🚀 Starting checkout for ${tierId} tier`);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tier: tierId,
          successUrl: `${window.location.origin}/success?tier=${tierId}`,
          cancelUrl: `${window.location.origin}/pricing`
        }),
      });

      const { sessionId } = await response.json();
      
      if (sessionId) {
        // In a real implementation, redirect to Stripe Checkout
        console.log('✅ Stripe session created:', sessionId);
        alert(`Checkout session created for ${tierId}. In production, this would redirect to Stripe.`);
      }
    } catch (error) {
      console.error('❌ Checkout failed:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Creator Tier</h2>
        <p className="text-xl text-gray-600">Unlock the full potential of immersive creation</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-2xl shadow-lg overflow-hidden ${
              tier.popular
                ? 'ring-2 ring-purple-500 scale-105 z-10'
                : 'border border-gray-200'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-semibold">
                Most Popular
              </div>
            )}
            
            <div className={`p-6 ${tier.popular ? 'pt-12' : ''} bg-white`}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ${tier.price}
                  <span className="text-lg font-normal text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">{tier.generationLimit} generations/month</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.licenseAccess && (
                <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="text-center">
                    <div className="text-2xl mb-1">👑</div>
                    <div className="text-sm font-semibold text-purple-700">IP Ownership Rights</div>
                    <div className="text-xs text-purple-600">Retain rights to your creations</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={isLoading === tier.id}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  tier.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                } ${isLoading === tier.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading === tier.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Start ${tier.name}`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">🔒 Secure payment processing via Stripe</p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>✓ Cancel anytime</span>
          <span>✓ 30-day money back</span>
          <span>✓ No setup fees</span>
        </div>
      </div>
    </div>
  );
}