"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle, TrendingUp, Shield, Users, ArrowLeft, UserPlus, Quote, ExternalLink } from 'lucide-react'

export function FoundingInvestor() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinWebsite: '',
    investmentTier: '',
    hearAbout: '',
    whyInvesting: '',
    acknowledgeTerms: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Investment interest form submission started:', formData)
    
    if (!formData.fullName || !formData.email || !formData.investmentTier || !formData.acknowledgeTerms) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields and acknowledge the terms.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      console.log('Submitting investment interest form:', formData)
      
      // Submit to Formspree (using same endpoint for now)
      const response = await fetch('https://formspree.io/f/manjzkpp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Investment Interest',
          fullName: formData.fullName,
          email: formData.email,
          linkedinWebsite: formData.linkedinWebsite,
          investmentTier: formData.investmentTier,
          hearAbout: formData.hearAbout,
          whyInvesting: formData.whyInvesting,
          acknowledgeTerms: formData.acknowledgeTerms
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Investment Interest Submitted! 💰",
          description: "Our leadership team will follow up with qualified investors shortly.",
        })
        
        console.log('Investment interest submission successful')
      } else {
        throw new Error('Form submission failed')
      }
      
    } catch (error) {
      console.error('Investment form submission error:', error)
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative py-20 cosmic-bg" data-macaly="founding-investor-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-cosmic-gradient">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-cosmic-white mb-4">
                  Become a <span className="text-gradient">Founding Investor</span>
                </h1>
                <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto">
                  Join visionary investors backing the next generation of immersive creation. 
                  Help build the operating system of the spatial internet.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 rounded-lg bg-cosmic-white/5 border border-cosmic-white/10">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-cosmic-white mb-2">Protected Investment</h3>
                  <p className="text-sm text-cosmic-white/70">Non-controlling equity with revenue share potential</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-cosmic-white/5 border border-cosmic-white/10">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-cosmic-white mb-2">Elite Community</h3>
                  <p className="text-sm text-cosmic-white/70">Join a select group of forward-thinking investors</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-cosmic-white/5 border border-cosmic-white/10">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-cosmic-white mb-2">Growth Potential</h3>
                  <p className="text-sm text-cosmic-white/70">Target 500%+ ROI by Year 3 based on conservative projections</p>
                </div>
              </div>

              {/* Founder Quote */}
              <div className="mb-12">
                <Card className="glass-panel border-cosmic-purple/30 p-8 bg-cosmic-purple/5 relative">
                  <Quote className="w-12 h-12 text-cosmic-purple/30 absolute top-4 left-6" />
                  <div className="text-center pt-4">
                    <blockquote className="text-xl md:text-2xl font-medium text-cosmic-white mb-6 italic leading-relaxed">
                      "Nemurium is more than a platform — it's the infrastructure for the immersive future. 
                      This isn't just tech; it's legacy."
                    </blockquote>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-0.5 bg-cosmic-gradient mr-4"></div>
                      <cite className="text-cosmic-white/80 font-bold not-italic">Jethro Gordon, Founder</cite>
                      <div className="w-12 h-0.5 bg-cosmic-gradient ml-4"></div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Investment Form */}
              <Card className="glass-panel border-cosmic-white/20 p-8 cosmic-glow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-cosmic-white text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="mt-1 bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-cosmic-white text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1 bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* LinkedIn/Website */}
                  <div>
                    <Label htmlFor="linkedinWebsite" className="text-cosmic-white text-sm font-medium">
                      LinkedIn or Business Website (Optional)
                    </Label>
                    <Input
                      id="linkedinWebsite"
                      type="url"
                      value={formData.linkedinWebsite}
                      onChange={(e) => setFormData({...formData, linkedinWebsite: e.target.value})}
                      className="mt-1 bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                      placeholder="https://linkedin.com/in/yourname or https://yourcompany.com"
                    />
                  </div>

                  {/* Investment Tier */}
                  <div>
                    <Label htmlFor="investmentTier" className="text-cosmic-white text-sm font-medium">
                      Investment Tier *
                    </Label>
                    <Select value={formData.investmentTier} onValueChange={(value) => setFormData({...formData, investmentTier: value})}>
                      <SelectTrigger className="mt-1 bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white">
                        <SelectValue placeholder="Select your investment level" />
                      </SelectTrigger>
                      <SelectContent className="bg-cosmic-dark border-cosmic-white/20">
                        <SelectItem value="1000" className="text-cosmic-white hover:bg-cosmic-white/10">
                          $1,000 – Early Supporter Tier
                        </SelectItem>
                        <SelectItem value="5000" className="text-cosmic-white hover:bg-cosmic-white/10">
                          $5,000 – Core Contributor Tier
                        </SelectItem>
                        <SelectItem value="10000+" className="text-cosmic-white hover:bg-cosmic-white/10">
                          $10,000+ – Founding Partner Tier
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <Label htmlFor="hearAbout" className="text-cosmic-white text-sm font-medium">
                      How did you hear about Nemurium?
                    </Label>
                    <Input
                      id="hearAbout"
                      type="text"
                      value={formData.hearAbout}
                      onChange={(e) => setFormData({...formData, hearAbout: e.target.value})}
                      className="mt-1 bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white placeholder:text-cosmic-white/50"
                      placeholder="Social media, referral, news article, etc."
                    />
                  </div>

                  {/* Why investing */}
                  <div>
                    <Label htmlFor="whyInvesting" className="text-cosmic-white text-sm font-medium">
                      Why are you interested in investing?
                    </Label>
                    <Textarea
                      id="whyInvesting"
                      value={formData.whyInvesting}
                      onChange={(e) => setFormData({...formData, whyInvesting: e.target.value})}
                      className="mt-1 bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white placeholder:text-cosmic-white/50 min-h-[120px]"
                      placeholder="Share your vision for the immersive future and why Nemurium aligns with your investment goals..."
                    />
                  </div>

                  {/* Terms Acknowledgment */}
                  <div className="flex items-start space-x-3 p-4 bg-cosmic-white/5 rounded-lg border border-cosmic-white/10">
                    <Checkbox
                      id="acknowledgeTerms"
                      checked={formData.acknowledgeTerms}
                      onCheckedChange={(checked) => setFormData({...formData, acknowledgeTerms: checked as boolean})}
                      className="mt-1 border-cosmic-white/30 data-[state=checked]:bg-cosmic-gradient data-[state=checked]:border-cosmic-gradient"
                    />
                    <Label htmlFor="acknowledgeTerms" className="text-cosmic-white text-sm leading-relaxed">
                      I acknowledge this is a non-controlling equity opportunity and I have read the terms. 
                      I understand that this investment does not grant voting rights or operational control.
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cosmic-gradient hover:bg-cosmic-gradient/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Investment Interest"}
                  </Button>
                </form>
              </Card>

              {/* Privacy & Security */}
              <div className="mt-8 space-y-6">
                {/* View Summary Button */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://assets.macaly-user-data.dev/wvrojahcncpgvfxb0edbs5xw/w8nn108w9ct2sdpp3m11e3pd/hKJQ9SMI6gK_EDMMXwumz/image.png', '_blank')}
                    className="border-cosmic-cyan/30 text-cosmic-cyan hover:bg-cosmic-cyan/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Investment Summary
                  </Button>
                </div>

                {/* Privacy Message */}
                <div className="bg-cosmic-white/5 border border-cosmic-white/10 rounded-lg p-4 text-center">
                  <p className="text-cosmic-white/70 text-sm">
                    🔒 Your information is never shared or sold. All submissions are securely stored and used only for Nemurium onboarding.
                  </p>
                </div>

                {/* Coming Soon Note */}
                <div className="bg-cosmic-gradient/10 border border-cosmic-purple/30 rounded-lg p-6 text-center">
                  <h4 className="text-cosmic-purple font-bold text-lg mb-3">🎉 Dashboard Now Live!</h4>
                  <p className="text-cosmic-white/70 text-sm mb-4">
                    Preview the investor dashboard with real-time metrics, platform updates, and exclusive features.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection('dashboard')}
                    className="border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-purple/10 font-medium"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Dashboard Preview
                  </Button>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('hero')}
                  className="border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('waitlist')}
                  className="border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join the Waitlist
                </Button>
              </div>
            </>
          ) : (
            /* Success State */
            <Card className="glass-panel border-green-500/30 p-8 cosmic-glow text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-cosmic-white mb-4">
                Thank you for your <span className="text-gradient">investment interest!</span>
              </h2>
              <p className="text-cosmic-white/80 mb-6 text-lg">
                Our leadership team will follow up with qualified investors shortly.
              </p>
              <p className="text-cosmic-white/60 mb-8 text-sm">
                We'll review your application and reach out within 2-3 business days to discuss next steps.
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('hero')}
                  className="border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('waitlist')}
                  className="border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join the Waitlist
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}