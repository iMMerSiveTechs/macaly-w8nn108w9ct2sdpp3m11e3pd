"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { 
  Mail, 
  User, 
  Send, 
  CheckCircle,
  Loader2
} from 'lucide-react'

interface SimpleFormData {
  name: string
  email: string
  interest: string
}

export function SimpleWaitlist() {
  console.log('SimpleWaitlist component rendered')
  
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SimpleFormData>({
    name: '',
    email: '',
    interest: ''
  })

  const handleInputChange = (field: keyof SimpleFormData, value: string) => {
    console.log(`Form field ${field} changed to:`, value)
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission started with data:', formData)
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in your name and email address.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call - replace with actual submission logic
      console.log('Submitting waitlist form:', formData)
      
      // Here you would normally send to your backend API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      toast({
        title: "Thanks for joining the Nemurium Waitlist! 🌌",
        description: "We'll be in touch soon with updates and early access opportunities.",
      })
      
      console.log('Waitlist signup successful')
      
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
                We'll be in touch soon with updates, early access opportunities, and exclusive content.
              </p>
              <p className="text-cosmic-white/60 text-sm">
                Welcome to the future of immersive creation! 🚀
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-transparent via-cosmic-cyan/5 to-transparent">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-cosmic-white mb-6">
            Join the <span className="text-gradient">Waitlist</span>
          </h2>
          <p className="text-xl text-cosmic-white/80 max-w-lg mx-auto leading-relaxed">
            Be first in line when Nemurium launches and get exclusive early access to the future of immersive creation.
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
              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
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

              <div>
                <label className="block text-cosmic-white font-medium mb-2">
                  Why are you interested in Nemurium?
                </label>
                <Textarea
                  value={formData.interest}
                  onChange={(e) => handleInputChange('interest', e.target.value)}
                  placeholder="Tell us what excites you about building immersive worlds..."
                  rows={4}
                  className="bg-cosmic-slate/20 border-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                />
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
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Ready to join?</h3>

              <a
                href="https://jaytee5644.gumroad.com/l/founding-creator-monthly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md"
              >
                Choose Founding Creator
              </a>

              <a
                href="https://jaytee5644.gumroad.com/l/founding-creator-yearly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md mt-4 ml-4"
              >
                Choose Yearly Plan
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}