"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  Users, 
  MessageSquare, 
  Star,
  Zap,
  Shield,
  Coins,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export function FoundingCreator() {
  console.log('FoundingCreator component rendered')

  const tiers = [
    {
      name: 'Supporter',
      price: '$5 / month',
      billingNote: 'Billed monthly. Cancel anytime.',
      description: 'Support the vision',
      color: 'cosmic-cyan',
      features: [
        'Name listed on our Nemurium "Thank You Wall"',
        'Access to public creator updates',
        'Early community access'
      ],
      icon: Users,
      popular: false
    },
    {
      name: 'Founding Creator',
      price: '$25 / month',
      billingNote: 'Billed monthly. Cancel anytime.',
      description: 'Shape the future',
      color: 'cosmic-purple',
      features: [
        'Early beta access',
        'Founding Badge on profile',
        'Private Discord invite',
        'Name permanently listed in credits',
        'Exclusive creator workshops'
      ],
      icon: Crown,
      popular: true
    },
    {
      name: 'Inner Circle',
      price: '$75 / month',
      billingNote: 'Billed monthly. Cancel anytime.',
      description: 'Inner circle access',
      color: 'cosmic-amber',
      features: [
        'All Founding Creator benefits',
        'Private roadmap sessions',
        'Influence on feature priority',
        'Access to early internal dev demos',
        'Exclusive NFT creator badge',
        'Crypto payment options'
      ],
      icon: Star,
      popular: false
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Exclusive Early Access',
      description: 'Be among the first to use our creation tools before public release'
    },
    {
      icon: Crown,
      title: 'Founding Badge',
      description: 'Permanent recognition as a platform pioneer on your creator profile'
    },
    {
      icon: MessageSquare,
      title: 'Private Discord',
      description: 'Direct line to our team and fellow founding creators'
    },
    {
      icon: Award,
      title: 'Permanent Credits',
      description: 'Your name forever listed as a founding supporter of the platform'
    }
  ]

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-transparent via-cosmic-purple/5 to-transparent">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-6">
            <span className="text-gradient">Founding Creator</span> Access
          </h2>
          <p className="text-xl text-cosmic-white/80 max-w-3xl mx-auto leading-relaxed">
            We're launching Nemurium with a select group of early creators.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-panel border-white/10 p-6 floating-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cosmic-white mb-2">{benefit.title}</h3>
                      <p className="text-cosmic-white/70">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => {
              const Icon = tier.icon
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cosmic-gradient text-white font-bold px-4 py-1 z-10">
                      Most Popular
                    </Badge>
                  )}
                  
                  <Card className={`glass-panel border-white/10 p-8 h-full floating-card ${
                    tier.popular ? 'ring-2 ring-cosmic-purple/50 cosmic-glow' : ''
                  }`}>
                    <div className="text-center mb-6">
                      <Icon className={`w-12 h-12 mx-auto mb-4 ${
                        tier.color === 'cosmic-purple' ? 'text-cosmic-purple' :
                        tier.color === 'cosmic-cyan' ? 'text-cosmic-cyan' :
                        'text-cosmic-amber'
                      }`} />
                      <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                      <div className="mb-4">
                        <p className="text-4xl font-black text-gradient">{tier.price}</p>
                        {tier.billingNote && (
                          <p className="text-sm text-white/90 mt-2 font-semibold bg-white/5 px-3 py-1 rounded-full inline-block">{tier.billingNote}</p>
                        )}
                      </div>
                      <p className="text-sm text-cosmic-white/70 mb-4">{tier.description}</p>
                    </div>
                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-cosmic-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={() => {
                        const tierUrls = {
                          'Supporter': 'https://jaytee5644.gumroad.com/l/ntpmhch', // Bronze Stake
                          'Founding Creator': 'https://jaytee5644.gumroad.com/l/ntpmhch', // Also Bronze Stake 
                          'Inner Circle': 'https://jaytee5644.gumroad.com/l/nfuxvi' // Silver Stake
                        }
                        window.open(tierUrls[tier.name as keyof typeof tierUrls] || 'https://jaytee5644.gumroad.com/l/ntpmhch', '_blank')
                      }}
                      className={`w-full font-bold ${
                        tier.popular 
                          ? 'btn-cosmic text-white' 
                          : 'border-white/20 text-cosmic-white hover:bg-white/5'
                      }`}
                      variant={tier.popular ? 'default' : 'outline'}
                    >
                      {tier.name === 'Inner Circle' && <Coins className="w-4 h-4 mr-2" />}
                      Choose {tier.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-cosmic-white/80 mb-8 max-w-2xl mx-auto">
            Founders help shape the product and are first to publish, test, and monetize their immersive creations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://jaytee5644.gumroad.com/l/ntpmhch', '_blank')}
              size="lg"
              className="btn-cosmic text-white font-bold px-8"
            >
              <Crown className="w-5 h-5 mr-2" />
              Become a Founding Creator
            </Button>
            
            <Button 
              onClick={() => window.open('https://tally.so/r/mR6Jy8', '_blank')}
              variant="outline"
              size="lg"
              className="border-cosmic-cyan/50 text-cosmic-cyan hover:bg-cosmic-cyan/10"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Free Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}