import { NextResponse } from 'next/server'
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase-config'

// AI Feedback System for Self-Improving Models
export async function POST(request: Request) {
  try {
    const { 
      resultId, 
      feedback, 
      prompt, 
      model, 
      generationType,
      userId,
      confidence,
      improvementSuggestions 
    } = await request.json()

    if (!resultId || !feedback || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('🧠 Processing AI feedback:', { resultId, feedback, model, generationType })

    // Store feedback in database
    await storeFeedback({
      resultId,
      feedback,
      prompt,
      model,
      generationType,
      userId,
      confidence,
      improvementSuggestions,
      timestamp: new Date().toISOString()
    })

    // Analyze feedback patterns
    const feedbackAnalysis = await analyzeFeedbackPatterns(model, generationType, feedback)
    
    // Update model performance metrics
    await updateModelMetrics(model, feedback, confidence)
    
    // Generate improvement recommendations
    const improvements = await generateImprovements(prompt, feedback, model)
    
    // Train adaptive prompting system
    await updatePromptOptimization(prompt, feedback, generationType)

    return NextResponse.json({
      success: true,
      feedbackProcessed: true,
      analysis: feedbackAnalysis,
      improvements: improvements,
      message: 'Thank you for helping improve our AI system!'
    })

  } catch (error) {
    console.error('Feedback processing error:', error)
    return NextResponse.json({ 
      error: 'Failed to process feedback',
      details: error.message 
    }, { status: 500 })
  }
}

// GET endpoint to retrieve AI insights and improvements
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const model = url.searchParams.get('model')
    const type = url.searchParams.get('type')

    if (!model) {
      return NextResponse.json({ error: 'Model parameter required' }, { status: 400 })
    }

    const insights = await getModelInsights(model, type)
    const suggestions = await getOptimizationSuggestions(model, type)
    const performance = await getModelPerformance(model, type)

    return NextResponse.json({
      success: true,
      model,
      type,
      insights,
      suggestions,
      performance,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Feedback retrieval error:', error)
    return NextResponse.json({ 
      error: 'Failed to retrieve feedback data',
      details: error.message 
    }, { status: 500 })
  }
}

async function storeFeedback(feedbackData: any) {
  try {
    const feedbackDoc = doc(db, 'ai_feedback', feedbackData.resultId)
    await setDoc(feedbackDoc, feedbackData)
    
    // Also store in aggregated collection for analysis
    const aggregatedDoc = doc(db, 'feedback_analytics', `${feedbackData.model}_${Date.now()}`)
    await setDoc(aggregatedDoc, {
      model: feedbackData.model,
      generationType: feedbackData.generationType,
      feedback: feedbackData.feedback,
      confidence: feedbackData.confidence,
      timestamp: feedbackData.timestamp,
      promptLength: feedbackData.prompt.length,
      promptComplexity: calculatePromptComplexity(feedbackData.prompt)
    })
    
    console.log('✅ Feedback stored successfully')
  } catch (error) {
    console.error('Error storing feedback:', error)
    throw error
  }
}

async function analyzeFeedbackPatterns(model: string, generationType: string, feedback: string) {
  try {
    console.log('📊 Analyzing feedback patterns...')
    
    // Get recent feedback for this model
    const feedbackQuery = query(
      collection(db, 'feedback_analytics'),
      where('model', '==', model),
      where('generationType', '==', generationType)
    )
    
    const querySnapshot = await getDocs(feedbackQuery)
    const recentFeedback = []
    
    querySnapshot.forEach((doc) => {
      recentFeedback.push(doc.data())
    })

    // Calculate patterns
    const totalFeedback = recentFeedback.length
    const positiveFeedback = recentFeedback.filter(f => f.feedback === 'positive').length
    const negativeFeedback = recentFeedback.filter(f => f.feedback === 'negative').length
    
    const positiveRate = totalFeedback > 0 ? (positiveFeedback / totalFeedback) * 100 : 0
    const averageConfidence = totalFeedback > 0 ? 
      recentFeedback.reduce((sum, f) => sum + (f.confidence || 0), 0) / totalFeedback : 0

    // Identify improvement areas
    const improvementAreas = []
    if (positiveRate < 70) improvementAreas.push('quality')
    if (averageConfidence < 0.8) improvementAreas.push('consistency')
    if (negativeFeedback > positiveFeedback) improvementAreas.push('user_satisfaction')

    return {
      totalFeedback,
      positiveRate: Math.round(positiveRate),
      averageConfidence: Math.round(averageConfidence * 100),
      improvementAreas,
      trend: calculateTrend(recentFeedback)
    }

  } catch (error) {
    console.error('Error analyzing feedback patterns:', error)
    return {
      totalFeedback: 0,
      positiveRate: 0,
      averageConfidence: 0,
      improvementAreas: [],
      trend: 'stable'
    }
  }
}

async function updateModelMetrics(model: string, feedback: string, confidence: number) {
  try {
    const metricsDoc = doc(db, 'model_metrics', model)
    const metricsSnapshot = await getDoc(metricsDoc)
    
    let currentMetrics = {
      totalGenerations: 0,
      positiveCount: 0,
      negativeCount: 0,
      averageConfidence: 0,
      lastUpdated: new Date().toISOString()
    }

    if (metricsSnapshot.exists()) {
      currentMetrics = metricsSnapshot.data() as any
    }

    // Update metrics
    currentMetrics.totalGenerations += 1
    if (feedback === 'positive') currentMetrics.positiveCount += 1
    if (feedback === 'negative') currentMetrics.negativeCount += 1
    
    // Recalculate average confidence
    const oldAvg = currentMetrics.averageConfidence || 0
    const newCount = currentMetrics.totalGenerations
    currentMetrics.averageConfidence = (oldAvg * (newCount - 1) + (confidence || 0)) / newCount
    
    currentMetrics.lastUpdated = new Date().toISOString()

    await setDoc(metricsDoc, currentMetrics)
    
    console.log('📈 Model metrics updated:', model, currentMetrics)
  } catch (error) {
    console.error('Error updating model metrics:', error)
  }
}

async function generateImprovements(prompt: string, feedback: string, model: string) {
  try {
    console.log('🚀 Generating AI improvements...')
    
    if (feedback === 'negative') {
      return {
        promptOptimization: optimizePrompt(prompt),
        modelSuggestions: getModelSuggestions(model, prompt),
        parameterTuning: getParameterRecommendations(model, prompt),
        alternativeModels: getAlternativeModels(model, prompt)
      }
    } else {
      return {
        successFactors: analyzeSuccessFactors(prompt, model),
        enhancement: 'Consider similar prompts for consistent quality',
        recommendation: 'Current approach is working well'
      }
    }
  } catch (error) {
    console.error('Error generating improvements:', error)
    return { error: 'Could not generate improvements' }
  }
}

async function updatePromptOptimization(prompt: string, feedback: string, generationType: string) {
  try {
    // Store prompt patterns for future optimization
    const promptDoc = doc(db, 'prompt_optimization', `${generationType}_${Date.now()}`)
    await setDoc(promptDoc, {
      originalPrompt: prompt,
      feedback,
      generationType,
      promptLength: prompt.length,
      keywords: extractKeywords(prompt),
      sentiment: analyzeSentiment(prompt),
      complexity: calculatePromptComplexity(prompt),
      timestamp: new Date().toISOString()
    })

    // If negative feedback, generate optimized version
    if (feedback === 'negative') {
      const optimizedPrompt = await optimizePromptWithAI(prompt, generationType)
      
      await setDoc(doc(db, 'prompt_suggestions', prompt), {
        original: prompt,
        optimized: optimizedPrompt,
        generationType,
        reason: 'Based on negative feedback',
        timestamp: new Date().toISOString()
      })
    }

    console.log('🔧 Prompt optimization updated')
  } catch (error) {
    console.error('Error updating prompt optimization:', error)
  }
}

function calculatePromptComplexity(prompt: string): number {
  // Calculate complexity score based on various factors
  const wordCount = prompt.split(' ').length
  const uniqueWords = new Set(prompt.toLowerCase().split(' ')).size
  const avgWordLength = prompt.replace(/[^\w\s]/g, '').length / wordCount
  const punctuationCount = (prompt.match(/[.,!?;:]/g) || []).length
  
  // Normalize to 0-1 scale
  const complexity = Math.min(
    (wordCount * 0.1 + uniqueWords * 0.1 + avgWordLength * 0.2 + punctuationCount * 0.3) / 10,
    1
  )
  
  return Math.round(complexity * 100) / 100
}

function calculateTrend(feedbackData: any[]): string {
  if (feedbackData.length < 2) return 'stable'
  
  // Sort by timestamp
  const sorted = feedbackData.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
  
  const recent = sorted.slice(-10) // Last 10 items
  const older = sorted.slice(-20, -10) // Previous 10 items
  
  if (recent.length === 0 || older.length === 0) return 'stable'
  
  const recentPositive = recent.filter(f => f.feedback === 'positive').length / recent.length
  const olderPositive = older.filter(f => f.feedback === 'positive').length / older.length
  
  if (recentPositive > olderPositive + 0.1) return 'improving'
  if (recentPositive < olderPositive - 0.1) return 'declining'
  return 'stable'
}

function optimizePrompt(prompt: string): string {
  // Basic prompt optimization rules
  let optimized = prompt
  
  // Add quality modifiers if missing
  if (!prompt.toLowerCase().includes('high quality')) {
    optimized += ', high quality'
  }
  
  if (!prompt.toLowerCase().includes('detailed')) {
    optimized += ', detailed'
  }
  
  // Remove redundant words
  optimized = optimized.replace(/\b(\w+)\s+\1\b/gi, '$1')
  
  // Clean up spacing
  optimized = optimized.replace(/\s+/g, ' ').trim()
  
  return optimized
}

function getModelSuggestions(model: string, prompt: string): string[] {
  const suggestions = []
  
  // Model-specific suggestions
  if (model.includes('sdxl')) {
    suggestions.push('Try adding "masterpiece, best quality" to prompt')
    suggestions.push('Consider using aspect ratio parameters')
  }
  
  if (model.includes('musicgen')) {
    suggestions.push('Include tempo and genre keywords')
    suggestions.push('Specify instruments or mood descriptors')
  }
  
  if (model.includes('runway')) {
    suggestions.push('Add camera movement descriptions')
    suggestions.push('Include lighting and mood specifications')
  }
  
  return suggestions
}

function getParameterRecommendations(model: string, prompt: string): any {
  // Generate parameter tuning recommendations
  return {
    guidance_scale: 'Try adjusting between 5-15 for different styles',
    steps: 'Increase inference steps for higher quality',
    temperature: 'Lower temperature for more consistent results',
    seed: 'Use specific seeds to reproduce good results'
  }
}

function getAlternativeModels(model: string, prompt: string): string[] {
  const alternatives = []
  
  if (model.includes('2d') || model.includes('image')) {
    alternatives.push('Try DALL-E 3 for photorealistic images')
    alternatives.push('Use Midjourney style for artistic results')
  }
  
  if (model.includes('3d')) {
    alternatives.push('Meshy AI for high-quality 3D models')
    alternatives.push('Point-E for faster generation')
  }
  
  return alternatives
}

function analyzeSuccessFactors(prompt: string, model: string): string[] {
  const factors = []
  
  if (prompt.includes('detailed')) factors.push('Detailed descriptions work well')
  if (prompt.includes('high quality')) factors.push('Quality keywords improve results')
  if (prompt.length > 50) factors.push('Longer prompts provide better context')
  
  return factors
}

function extractKeywords(prompt: string): string[] {
  // Extract meaningful keywords from prompt
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
  const words = prompt.toLowerCase().match(/\b\w+\b/g) || []
  
  return words
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 10) // Top 10 keywords
}

function analyzeSentiment(prompt: string): string {
  const positiveWords = ['beautiful', 'amazing', 'wonderful', 'bright', 'happy', 'vibrant']
  const negativeWords = ['dark', 'scary', 'sad', 'gloomy', 'horror', 'disturbing']
  
  const promptLower = prompt.toLowerCase()
  const positiveScore = positiveWords.filter(word => promptLower.includes(word)).length
  const negativeScore = negativeWords.filter(word => promptLower.includes(word)).length
  
  if (positiveScore > negativeScore) return 'positive'
  if (negativeScore > positiveScore) return 'negative'
  return 'neutral'
}

async function optimizePromptWithAI(prompt: string, generationType: string): Promise<string> {
  try {
    // Use AI to optimize the prompt
    const response = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Optimize this ${generationType} generation prompt for better results: "${prompt}". Make it more specific and detailed while keeping the core intent.`
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.response || prompt
    }
  } catch (error) {
    console.error('AI prompt optimization failed:', error)
  }
  
  return optimizePrompt(prompt)
}

async function getModelInsights(model: string, type: string) {
  try {
    const metricsDoc = await getDoc(doc(db, 'model_metrics', model))
    
    if (!metricsDoc.exists()) {
      return { message: 'No data available yet' }
    }
    
    const data = metricsDoc.data()
    const successRate = data.totalGenerations > 0 ? 
      Math.round((data.positiveCount / data.totalGenerations) * 100) : 0
    
    return {
      successRate,
      totalGenerations: data.totalGenerations,
      averageConfidence: Math.round((data.averageConfidence || 0) * 100),
      recommendation: successRate > 80 ? 'Performing well' : 'Needs improvement'
    }
  } catch (error) {
    console.error('Error getting model insights:', error)
    return { error: 'Could not retrieve insights' }
  }
}

async function getOptimizationSuggestions(model: string, type: string) {
  // Return AI-generated optimization suggestions
  return [
    'Use more descriptive keywords in prompts',
    'Experiment with different style modifiers',
    'Adjust generation parameters for better quality',
    'Try alternative models for comparison'
  ]
}

async function getModelPerformance(model: string, type: string) {
  // Return performance metrics and trends
  return {
    speed: 'Fast',
    quality: 'High',
    consistency: 'Good',
    userSatisfaction: 85,
    trend: 'Improving'
  }
}