'use client';
import { useState, useRef } from 'react';
import { Gift, Crown, Star, Zap, Heart, X, Move } from 'lucide-react';
import { TIER_CONFIG } from '@/lib/config';
import { notifications } from '@/utils/notifications';

interface SupportTier {
  name: string;
  amount: number;
  icon: any;
  color: string;
  perks: string[];
}

export default function SupportUs() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const supportTiers = Object.entries(TIER_CONFIG).map(([key, config]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    amount: config.amount,
    icon: key === 'master' ? Crown : key === 'gold' ? Star : key === 'silver' ? Zap : Heart,
    color: key === 'master' ? 'bg-purple-600 hover:bg-purple-700' :
           key === 'gold' ? 'bg-yellow-600 hover:bg-yellow-700' :
           key === 'silver' ? 'bg-gray-600 hover:bg-gray-700' :
           'bg-pink-600 hover:bg-pink-700',
    perks: config.features
  }));

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    
    const rect = dragRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSupport = async (amount: number, tier: string) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tier: tier.toLowerCase(),
          email: 'supporter@example.com', // In production, get from user auth
          userId: 'demo-user'
        }),
      });

      const result = await response.json();
      
      if (result.url && !result.url.includes('demo=true')) {
        window.location.href = result.url;
      } else {
        // Demo mode
        notifications.supportThankYou(tier);
      }
    } catch (error) {
      console.error('Support payment error:', error);
      alert('There was an issue processing your support. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={dragRef}
      className="fixed bg-gradient-to-br from-green-600 to-emerald-700 text-white p-4 rounded-xl shadow-2xl max-w-sm border border-green-500/30 z-50"
      style={{ 
        left: position.x, 
        bottom: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-green-200" />
          <h4 className="text-lg font-bold">Support Nemurium</h4>
        </div>
        <div className="flex items-center gap-1">
          <button
            onMouseDown={handleMouseDown}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Drag to move"
          >
            <Move className="h-4 w-4 text-green-200" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="h-4 w-4 text-green-200" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-green-100 mb-4">
        Help us build the future of immersive creation & unlock exclusive rewards!
      </p>

      <div className="space-y-2">
        {supportTiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <button
              key={tier.name}
              onClick={() => handleSupport(tier.amount, tier.name)}
              disabled={isProcessing}
              className={`w-full p-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 ${tier.color} ${
                selectedTier === index ? 'ring-2 ring-white' : ''
              }`}
              onMouseEnter={() => setSelectedTier(index)}
              onMouseLeave={() => setSelectedTier(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold">{tier.name}</span>
                </div>
                <span className="font-bold">${tier.amount}/mo</span>
              </div>
              
              {selectedTier === index && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <ul className="text-xs text-left space-y-1">
                    {tier.perks.slice(0, 2).map((perk, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        {perk}
                      </li>
                    ))}
                    {tier.perks.length > 2 && (
                      <li className="text-white/70">+{tier.perks.length - 2} more features</li>
                    )}
                  </ul>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {isProcessing && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-green-200">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Processing...
          </div>
        </div>
      )}

      <div className="mt-3 text-center text-xs text-green-200">
        One-time or monthly • Cancel anytime
      </div>
    </div>
  );
}