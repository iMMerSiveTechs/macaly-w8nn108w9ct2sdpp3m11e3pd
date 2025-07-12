"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Crown, 
  Star, 
  Shield, 
  Users, 
  Upload, 
  BarChart3, 
  Settings, 
  CreditCard,
  AlertCircle,
  CheckCircle,
  Calendar,
  FileText,
  Image,
  Music,
  Video,
  Glasses,
  Sparkles
} from 'lucide-react'
import { SubscriptionTier } from '@/lib/subscription-system'

// Mock data - replace with actual tRPC calls
const mockUserData = {
  id: "user-123",
  name: "Jane Creator",
  email: "jane@example.com",
  avatar: "/api/placeholder/64/64",
  subscriptionTier: SubscriptionTier.FOUNDING_CREATOR,
  isActive: true,
  planStartDate: new Date('2024-01-15'),
  planEndDate: new Date('2024-12-15'),
  contentLimit: 100,
  usedContentSlots: 23,
  hasLifetimeAccess: false,
  remainingSlots: 77,
  daysUntilBilling: 15,
  totalContent: 23,
  allowedContentTypes: ['text', 'image', 'audio', 'video']
}

const tierColors = {
  [SubscriptionTier.FREE]: 'bg-gray-500',
  [SubscriptionTier.SUPPORTER]: 'bg-blue-500',
  [SubscriptionTier.FOUNDING_CREATOR]: 'bg-purple-500',
  [SubscriptionTier.INNER_CIRCLE]: 'bg-yellow-500',
  [SubscriptionTier.LIFETIME]: 'bg-gradient-to-r from-purple-500 to-yellow-500'
}

const tierIcons = {
  [SubscriptionTier.FREE]: Users,
  [SubscriptionTier.SUPPORTER]: Shield,
  [SubscriptionTier.FOUNDING_CREATOR]: Crown,
  [SubscriptionTier.INNER_CIRCLE]: Star,
  [SubscriptionTier.LIFETIME]: Sparkles
}

const contentTypeIcons = {
  text: FileText,
  image: Image,
  audio: Music,
  video: Video,
  vr: Glasses,
  ar: Glasses,
  nft: Sparkles
}

export function ProtectedDashboard() {
  const [userData, setUserData] = useState(mockUserData)
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock functions - replace with actual tRPC calls
  const upgradeSubscription = async (newTier: SubscriptionTier) => {
    setIsLoading(true)
    console.log('Upgrading to:', newTier)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const createContent = async (contentType: string) => {
    console.log('Creating content of type:', contentType)
    // Simulate content creation
    setUserData(prev => ({
      ...prev,
      usedContentSlots: prev.usedContentSlots + 1,
      remainingSlots: prev.remainingSlots - 1,
      totalContent: prev.totalContent + 1
    }))
  }

  const TierIcon = tierIcons[userData.subscriptionTier]
  const usagePercentage = (userData.usedContentSlots / userData.contentLimit) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-space via-cosmic-void to-cosmic-space">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {userData.name}
              </h1>
              <p className="text-cosmic-white/70">
                Manage your Nemurium creator account and content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge 
                className={`${tierColors[userData.subscriptionTier]} text-white font-bold px-4 py-2`}
              >
                <TierIcon className="w-4 h-4 mr-2" />
                {userData.subscriptionTier.replace('_', ' ')}
              </Badge>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-cosmic-gradient">
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-cosmic-gradient">
              Content
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-cosmic-gradient">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="billing" className="text-white data-[state=active]:bg-cosmic-gradient">
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Subscription Status */}
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Subscription Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-cosmic-white/70">Current Plan</span>
                      <Badge className={`${tierColors[userData.subscriptionTier]} text-white`}>
                        {userData.subscriptionTier.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cosmic-white/70">Status</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cosmic-white/70">Next billing</span>
                      <span className="text-white">{userData.daysUntilBilling} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Usage */}
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Content Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-cosmic-white/70">Used this month</span>
                      <span className="text-white">{userData.usedContentSlots} / {userData.contentLimit}</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-cosmic-white/70">Remaining</span>
                      <span className="text-cosmic-cyan">{userData.remainingSlots} slots</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-panel border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full btn-cosmic text-white"
                      onClick={() => createContent('text')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Create Content
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/5"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Types Access */}
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content Types Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(contentTypeIcons).map(([type, Icon]) => {
                    const hasAccess = userData.allowedContentTypes.includes(type)
                    return (
                      <div 
                        key={type}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          hasAccess 
                            ? 'border-green-500/50 bg-green-500/10' 
                            : 'border-red-500/50 bg-red-500/10'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${hasAccess ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`capitalize ${hasAccess ? 'text-green-400' : 'text-red-400'}`}>
                          {type}
                        </span>
                        {hasAccess ? (
                          <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400 ml-auto" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.allowedContentTypes.map(type => {
                const Icon = contentTypeIcons[type as keyof typeof contentTypeIcons]
                return (
                  <Card key={type} className="glass-panel border-white/10 hover:border-cosmic-cyan/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        {type.charAt(0).toUpperCase() + type.slice(1)} Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full btn-cosmic text-white"
                        onClick={() => createContent(type)}
                        disabled={userData.remainingSlots <= 0}
                      >
                        Create {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cosmic-cyan mb-2">
                      {userData.totalContent}
                    </div>
                    <div className="text-cosmic-white/70">Total Content</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cosmic-purple mb-2">
                      {userData.usedContentSlots}
                    </div>
                    <div className="text-cosmic-white/70">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cosmic-amber mb-2">
                      {userData.remainingSlots}
                    </div>
                    <div className="text-cosmic-white/70">Remaining</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {Math.round(usagePercentage)}%
                    </div>
                    <div className="text-cosmic-white/70">Usage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-white font-semibold mb-2">Current Plan</h3>
                      <p className="text-cosmic-white/70 mb-4">
                        {userData.subscriptionTier.replace('_', ' ')} - Active
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-cosmic-white/70">Plan started</span>
                          <span className="text-white">{userData.planStartDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cosmic-white/70">Next billing</span>
                          <span className="text-white">{userData.planEndDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Upgrade Options</h3>
                      <div className="space-y-3">
                        {userData.subscriptionTier !== SubscriptionTier.INNER_CIRCLE && (
                          <Button 
                            className="w-full btn-cosmic text-white"
                            onClick={() => upgradeSubscription(SubscriptionTier.INNER_CIRCLE)}
                            disabled={isLoading}
                          >
                            Upgrade to Inner Circle
                          </Button>
                        )}
                        {userData.subscriptionTier !== SubscriptionTier.LIFETIME && (
                          <Button 
                            variant="outline"
                            className="w-full border-cosmic-amber/50 text-cosmic-amber hover:bg-cosmic-amber/10"
                            onClick={() => upgradeSubscription(SubscriptionTier.LIFETIME)}
                            disabled={isLoading}
                          >
                            Get Lifetime Access
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}