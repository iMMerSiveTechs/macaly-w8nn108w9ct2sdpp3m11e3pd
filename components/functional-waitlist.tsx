"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { 
  Mail, 
  Users, 
  Send, 
  CheckCircle,
  User,
  Palette,
  Gamepad2,
  MessageSquare,
  Crown,
  Loader2
} from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  creatorAlias: string
  worldType: string
  experienceLevel: string
  discordInterest: boolean
  portfolioLink: string
  foundingCreatorInterest: boolean
}

export function FunctionalWaitlist() {
  console.log('FunctionalWaitlist component rendered')
  
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    creatorAlias: '',
    worldType: '',
    experienceLevel: 'Beginner',
    discordInterest: false,
    portfolioLink: '',
    foundingCreatorInterest: false
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    console.log(`Form field ${field} changed to:`, value)
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission started with data:', formData)
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in your name and email address.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      console.log('Submitting waitlist form to Formspree:', formData)
      
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/manjzkpp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          creatorAlias: formData.creatorAlias,
          worldType: formData.worldType,
          experienceLevel: formData.experienceLevel,
          portfolioLink: formData.portfolioLink,
          discordInterest: formData.discordInterest,
          foundingCreatorInterest: formData.foundingCreatorInterest
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Thanks for joining the Nemurium Waitlist! 🌌",
          description: "We'll be in touch soon.",
        })
        
        console.log('Waitlist signup successful')
      } else {
        throw new Error('Form submission failed')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="py-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="glass-panel border-green-500/30 p-8 cosmic-glow">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-cosmic-white mb-4">
                Thanks for joining the <span className="text-gradient">Nemurium Waitlist!</span>
              </h2>
              <p className="text-cosmic-white/80 mb-6">
                We'll be in touch soon.
              </p>
              <Badge className="bg-cosmic-gradient text-white px-4 py-2">
                Waitlist Member #{Math.floor(Math.random() * 1000) + 3892}
              </Badge>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-transparent via-cosmic-cyan/5 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-6">
            Join the <span className="text-gradient">Waitlist</span>
          </h2>
          <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto leading-relaxed mb-4">
            Be first in line when Nemurium goes live
          </p>
          <p className="text-lg text-cosmic-white/70 max-w-2xl mx-auto">
            Get updates, early access, and your Creator Access form
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="glass-panel border-white/10 p-8 cosmic-glow">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cosmic-white font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-cosmic-white font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  <Palette className="w-4 h-4 inline mr-2" />
                  Creator Name / Alias
                </label>
                <Input
                  value={formData.creatorAlias}
                  onChange={(e) => handleInputChange('creatorAlias', e.target.value)}
                  placeholder="How you want to be known in the community"
                  className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                />
              </div>

              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  <Gamepad2 className="w-4 h-4 inline mr-2" />
                  What kind of world would you create first?
                </label>
                <Textarea
                  value={formData.worldType}
                  onChange={(e) => handleInputChange('worldType', e.target.value)}
                  placeholder="Describe your dream immersive world..."
                  rows={3}
                  className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                />
              </div>

              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                  className="w-full p-3 bg-cosmic-slate/20 border border-white/20 rounded-md text-cosmic-white"
                >
                  <option value="Beginner">Beginner - New to 3D/VR creation</option>
                  <option value="Intermediate">Intermediate - Some experience</option>
                  <option value="Advanced">Advanced - Experienced creator</option>
                  <option value="Professional">Professional - Industry experience</option>
                  <option value="Developer">Developer - Technical background</option>
                </select>
              </div>

              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  Portfolio Link (Optional)
                </label>
                <Input
                  type="url"
                  value={formData.portfolioLink}
                  onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                  placeholder="https://your-portfolio.com"
                  className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                />
              </div>

              <Separator className="bg-white/10" />

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="discord"
                    checked={formData.discordInterest}
                    onChange={(e) => handleInputChange('discordInterest', e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-cosmic-slate/20 text-cosmic-cyan"
                  />
                  <label htmlFor="discord" className="text-cosmic-white cursor-pointer">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    I want Discord community access
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="founding"
                    checked={formData.foundingCreatorInterest}
                    onChange={(e) => handleInputChange('foundingCreatorInterest', e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-cosmic-slate/20 text-cosmic-amber"
                  />
                  <label htmlFor="founding" className="text-cosmic-white cursor-pointer">
                    <Crown className="w-4 h-4 inline mr-2" />
                    I'm interested in the Founding Creator program
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full btn-cosmic text-white font-bold text-lg py-6 h-auto"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
              </Button>
            </form>
          </Card>

          {/* Additional CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-cosmic-white/60 mb-4">Want to skip the line?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  const investorSection = document.getElementById('investor')
                  if (investorSection) {
                    investorSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                variant="outline"
                className="border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-purple/10"
              >
                <Crown className="w-4 h-4 mr-2" />
                Become an Investor
              </Button>
              
              <Button 
                onClick={() => window.open('https://gumroad.com/l/nemurium-founding-creator', '_blank')}
                variant="outline"
                className="border-cosmic-amber/50 text-cosmic-amber hover:bg-cosmic-amber/10"
              >
                <Users className="w-4 h-4 mr-2" />
                Founding Creator Access
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}