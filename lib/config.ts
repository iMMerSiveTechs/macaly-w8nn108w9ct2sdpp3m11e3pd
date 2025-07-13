export const TIER_CONFIG = {
  bronze: { 
    priceId: "price_bronze_monthly", 
    amount: 19,
    limit: 25,
    features: ['Basic world builder', '25 AI generations/month', 'Public assets']
  },
  silver: { 
    priceId: "price_silver_monthly", 
    amount: 49,
    limit: 50,
    features: ['Advanced tools', '50 AI generations/month', 'Realm linking', 'Priority support']
  },
  gold: { 
    priceId: "price_gold_monthly", 
    amount: 99,
    limit: 100,
    features: ['Professional builder', '100 AI generations/month', 'Asset remix rights', 'VR preview']
  },
  master: { 
    priceId: "price_master_monthly", 
    amount: 199,
    limit: 500, 
    licenseEligible: true,
    features: ['Unlimited generations*', 'IP licensing tools', 'Priority support', 'Revenue sharing']
  },
};

export const PREFAB_TEMPLATES = {
  'starter-forest': {
    name: 'Mystical Forest',
    description: 'A peaceful woodland with glowing trees and crystal streams',
    objects: [
      { type: 'tree', x: 100, y: 100, rotation: 0, scale: 1, color: '#22c55e' },
      { type: 'tree', x: 200, y: 150, rotation: 45, scale: 1.2, color: '#16a34a' },
      { type: 'crystal', x: 150, y: 200, rotation: 0, scale: 0.8, color: '#06b6d4' },
      { type: 'rock', x: 80, y: 180, rotation: 90, scale: 1, color: '#6b7280' }
    ]
  },
  'cyber-city': {
    name: 'Neon Metropolis',
    description: 'A futuristic cityscape with holographic displays',
    objects: [
      { type: 'tower', x: 120, y: 80, rotation: 0, scale: 1.5, color: '#ef4444' },
      { type: 'tower', x: 220, y: 120, rotation: 0, scale: 1.8, color: '#3b82f6' },
      { type: 'portal', x: 170, y: 160, rotation: 0, scale: 1, color: '#8b5cf6' },
      { type: 'house', x: 80, y: 140, rotation: 15, scale: 0.9, color: '#f59e0b' }
    ]
  },
  'floating-sanctuary': {
    name: 'Sky Temple',
    description: 'Ancient ruins floating among the clouds',
    objects: [
      { type: 'portal', x: 160, y: 120, rotation: 0, scale: 1.3, color: '#8b5cf6' },
      { type: 'crystal', x: 100, y: 100, rotation: 30, scale: 1.1, color: '#06b6d4' },
      { type: 'crystal', x: 220, y: 140, rotation: -30, scale: 1.1, color: '#06b6d4' },
      { type: 'rock', x: 140, y: 180, rotation: 0, scale: 1.2, color: '#6b7280' }
    ]
  }
};

export type UserTier = keyof typeof TIER_CONFIG;

export function getTierLimits(tier: UserTier) {
  return TIER_CONFIG[tier] || TIER_CONFIG.bronze;
}

export function canAccessFeature(userTier: UserTier, feature: string): boolean {
  const tierLevel = Object.keys(TIER_CONFIG).indexOf(userTier);
  
  switch (feature) {
    case 'ip_licensing':
      return TIER_CONFIG[userTier].licenseEligible || false;
    case 'vr_preview':
      return tierLevel >= 2; // Gold and above
    case 'realm_linking':
      return tierLevel >= 1; // Silver and above
    case 'priority_support':
      return tierLevel >= 1; // Silver and above
    default:
      return true;
  }
}