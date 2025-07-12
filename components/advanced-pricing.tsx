"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Crown, 
  Star, 
  Shield, 
  Users, 
  Check, 
  X,
  Sparkles,
  Zap,
  FileText,
  Image,
  Music,
  Video,
  Glasses,
  Calendar,
  DollarSign,
  Infinity
} from 'lucide-react'
import { SubscriptionTier, tierConfig } from '@/lib/subscription-system'

interface PricingTier {
  id: SubscriptionTier
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  savings: number
  popular: boolean
  features: string[]
  contentTypes: string[]
  contentLimit: number
  maxFileSize: number
  badge: string
  icon: any
  color: string
  gumroadMonthlyUrl: string
  gumroadYearlyUrl: string
}

const pricingTiers: PricingTier[] = [
  {
    id: SubscriptionTier.FREE,
    name: 'Free',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    savings: 0,
    popular: false,
    features: [
      'Basic world creation',
      'Community access',
      'Public gallery',
      'Basic templates',
      'Email support'
    ],
    contentTypes: ['text', 'image'],
    contentLimit: 5,
    maxFileSize: 5,
    badge: 'Free Forever',
    icon: Users,
    color: 'from-gray-400 to-gray-600',
    gumroadMonthlyUrl: '',
    gumroadYearlyUrl: ''
  },
  {
    id: SubscriptionTier.SUPPORTER,
    name: 'Supporter',
    description: 'For dedicated creators',
    monthlyPrice: 5,
    yearlyPrice: 50,
    savings: 10,
    popular: false,
    features: [
      'Everything in Free',
      'Audio content support',
      'Early access to features',
      'Priority support',
      'Custom themes',
      'Advanced analytics'
    ],
    contentTypes: ['text', 'image', 'audio'],
    contentLimit: 25,
    maxFileSize: 25,
    badge: 'Great Value',
    icon: Shield,
    color: 'from-blue-400 to-blue-600',
    gumroadMonthlyUrl: 'https://jaytee5644.gumroad.com/l/supporter-monthly',
    gumroadYearlyUrl: 'https://jaytee5644.gumroad.com/l/supporter-yearly'
  },
  {
    id: SubscriptionTier.FOUNDING_CREATOR,
    name: 'Founding Creator',
    description: 'Shape the future of immersive creation',
    monthlyPrice: 25,
    yearlyPrice: 250,
    savings: 50,
    popular: true,
    features: [
      'Everything in Supporter',
      'Video content support',
      'Beta access to new features',
      'Founding Creator badge',
      'Priority support',
      'Revenue sharing opportunities',
      'Direct founder access'
    ],
    contentTypes: ['text', 'image', 'audio', 'video'],
    contentLimit: 100,
    maxFileSize: 100,
    badge: 'Most Popular',
    icon: Crown,
    color: 'from-purple-400 to-purple-600',
    gumroadMonthlyUrl: 'https://jaytee5644.gumroad.com/l/founding-creator-monthly',
    gumroadYearlyUrl: 'https://jaytee5644.gumroad.com/l/founding-creator-yearly'
  },
  {
    id: SubscriptionTier.INNER_CIRCLE,
    name: 'Inner Circle',
    description: 'For power users and studios',
    monthlyPrice: 75,
    yearlyPrice: 750,
    savings: 150,
    popular: false,
    features: [
      'Everything in Founding Creator',
      'VR/AR/NFT content support',
      'Unlimited uploads',
      'Advanced collaboration tools',
      'API access',
      'Custom integrations',
      'White-label options',
      'Dedicated account manager'
    ],
    contentTypes: ['text', 'image', 'audio', 'video', 'vr', 'ar', 'nft'],
    contentLimit: 1000,
    maxFileSize: 500,
    badge: 'Pro',
    icon: Star,
    color: 'from-yellow-400 to-yellow-600',
    gumroadMonthlyUrl: 'https://jaytee5644.gumroad.com/l/inner-circle-monthly',
    gumroadYearlyUrl: 'https://jaytee5644.gumroad.com/l/inner-circle-yearly'
  },
  {
    id: SubscriptionTier.LIFETIME,
    name: 'Lifetime',
    description: 'One-time investment, forever access',
    monthlyPrice: 999,
    yearlyPrice: 999,
    savings: 0,
    popular: false,
    features: [
      'Everything in Inner Circle',
      'Lifetime access',
      'No recurring payments',
      'Special lifetime badge',
      'Exclusive community access',
      'Early access to all future features',
      'Lifetime revenue sharing',
      'Founder recognition'
    ],
    contentTypes: ['text', 'image', 'audio', 'video', 'vr', 'ar', 'nft'],
    contentLimit: 1000,
    maxFileSize: 500,
    badge: 'Best Value',
    icon: Sparkles,
    color: 'from-purple-400 via-yellow-400 to-purple-600',
    gumroadMonthlyUrl: 'https://jaytee5644.gumroad.com/l/lifetime-access',
    gumroadYearlyUrl: 'https://jaytee5644.gumroad.com/l/lifetime-access'
  }
]

const contentTypeIcons = {
  text: FileText,
  image: Image,
  audio: Music,
  video: Video,
  vr: Glasses,
  ar: Glasses,
  nft: Sparkles
}

export function AdvancedPricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null)

  const handleUpgrade = (tier: PricingTier) => {
    const url = isYearly ? tier.gumroadYearlyUrl : tier.gumroadMonthlyUrl
    if (url) {
      window.open(url, '_blank')
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free'
    if (price === 999) return '$999 one-time'
    return `$${price}${isYearly ? '/year' : '/month'}`
  }

  const getEffectivePrice = (tier: PricingTier) => {
    if (tier.id === SubscriptionTier.LIFETIME) return tier.monthlyPrice
    return isYearly ? tier.yearlyPrice : tier.monthlyPrice
  }

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-transparent via-cosmic-purple/5 to-transparent">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="text-gradient">Choose Your</span> Creator Tier
          </h2>
          <p className="text-xl text-cosmic-white/80 max-w-3xl mx-auto mb-8">
            Join thousands of creators building the future of immersive experiences
          </p>
          
          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg ${!isYearly ? 'text-white' : 'text-cosmic-white/60'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-cosmic-gradient"
            />
            <span className={`text-lg ${isYearly ? 'text-white' : 'text-cosmic-white/60'}`}>
              Annual
            </span>
            {isYearly && (
              <Badge className="bg-cosmic-gradient text-white font-bold">
                Save up to 20%
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon
            const effectivePrice = getEffectivePrice(tier)
            const isSelected = selectedTier === tier.id
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${tier.popular ? 'md:scale-105' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-cosmic-gradient text-white font-bold px-4 py-2">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                
                <Card className={`glass-panel border-white/10 h-full ${
                  tier.popular ? 'ring-2 ring-cosmic-purple/50 cosmic-glow' : ''
                } ${isSelected ? 'ring-2 ring-cosmic-cyan/50' : ''}`}>
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {tier.name}
                    </CardTitle>
                    <p className="text-cosmic-white/70 text-sm mb-4">
                      {tier.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-black text-gradient mb-2">
                        {formatPrice(effectivePrice)}
                      </div>
                      {isYearly && tier.savings > 0 && tier.id !== SubscriptionTier.LIFETIME && (
                        <div className="text-sm text-green-400 font-medium">
                          Save ${tier.savings}/year
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Content Limits */}
                    <div className="mb-6 p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-cosmic-white/70 text-sm">Monthly uploads</span>
                        <span className="text-white font-bold">
                          {tier.contentLimit === 1000 ? (
                            <div className="flex items-center gap-1">
                              <Infinity className="w-4 h-4" />
                              Unlimited
                            </div>
                          ) : (
                            tier.contentLimit
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-cosmic-white/70 text-sm">Max file size</span>
                        <span className="text-white font-bold">{tier.maxFileSize}MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-cosmic-white/70 text-sm">Content types</span>
                        <div className="flex gap-1">
                          {tier.contentTypes.map(type => {
                            const TypeIcon = contentTypeIcons[type as keyof typeof contentTypeIcons]
                            return (
                              <div key={type} className="w-6 h-6 bg-cosmic-gradient rounded flex items-center justify-center">
                                <TypeIcon className="w-3 h-3 text-white" />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-cosmic-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Button
                      onClick={() => handleUpgrade(tier)}
                      className={`w-full font-bold ${
                        tier.popular || tier.id === SubscriptionTier.LIFETIME
                          ? 'btn-cosmic text-white'
                          : 'border-white/20 text-cosmic-white hover:bg-white/5'
                      }`}
                      variant={tier.popular || tier.id === SubscriptionTier.LIFETIME ? 'default' : 'outline'}
                      disabled={tier.id === SubscriptionTier.FREE}
                    >
                      {tier.id === SubscriptionTier.FREE ? (
                        'Current Plan'
                      ) : tier.id === SubscriptionTier.LIFETIME ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Get Lifetime Access
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Upgrade to {tier.name}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Feature Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full glass-panel border-white/10 rounded-lg">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-white font-bold">Feature</th>
                  {pricingTiers.map(tier => (
                    <th key={tier.id} className="text-center py-4 px-4 text-white font-bold">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 text-cosmic-white/80">Monthly uploads</td>
                  {pricingTiers.map(tier => (
                    <td key={tier.id} className="text-center py-4 px-4 text-white">
                      {tier.contentLimit === 1000 ? '∞' : tier.contentLimit}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 text-cosmic-white/80">Max file size</td>
                  {pricingTiers.map(tier => (
                    <td key={tier.id} className="text-center py-4 px-4 text-white">
                      {tier.maxFileSize}MB
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 text-cosmic-white/80">Video support</td>
                  {pricingTiers.map(tier => (
                    <td key={tier.id} className="text-center py-4 px-4">
                      {tier.contentTypes.includes('video') ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 text-cosmic-white/80">VR/AR support</td>
                  {pricingTiers.map(tier => (
                    <td key={tier.id} className="text-center py-4 px-4">
                      {tier.contentTypes.includes('vr') ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-6 text-cosmic-white/80">Priority support</td>
                  {pricingTiers.map(tier => (
                    <td key={tier.id} className="text-center py-4 px-4">
                      {tier.id !== SubscriptionTier.FREE ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="glass-panel border-white/10 text-left">
              <CardHeader>
                <CardTitle className="text-white">Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-white/80">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and you'll be charged or credited accordingly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-white/10 text-left">
              <CardHeader>
                <CardTitle className="text-white">What happens to my content if I downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-white/80">
                  Your existing content remains accessible, but you'll be limited to your new tier's monthly upload limits going forward.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-white/10 text-left">
              <CardHeader>
                <CardTitle className="text-white">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-white/80">
                  Yes! All paid plans come with a 7-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-white/10 text-left">
              <CardHeader>
                <CardTitle className="text-white">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-white/80">
                  We accept all major credit cards, PayPal, and cryptocurrency through our secure payment partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}