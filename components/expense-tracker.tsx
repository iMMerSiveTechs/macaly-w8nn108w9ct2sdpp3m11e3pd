/*
 * Nemurium Expense Tracker Component
 * Built by Nemurium AI Engine
 * Copyright (c) 2025 iMMerSive Technologies, LLC
 * All rights reserved. Unauthorized reproduction prohibited.
 */

"use client"

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExpenseData {
  category: string
  budgeted: number
  actual: number
  status: 'under' | 'over' | 'on-track'
}

export function ExpenseTracker() {
  console.log('ExpenseTracker component rendered')

  // Based on FINANCIAL_PLANNING.md
  const monthlyExpenses: ExpenseData[] = [
    { category: 'Legal Protection', budgeted: 865, actual: 65, status: 'under' },
    { category: 'Infrastructure', budgeted: 54, actual: 54, status: 'on-track' },
    { category: 'AI Services', budgeted: 200, actual: 125, status: 'under' },
    { category: 'Marketing', budgeted: 500, actual: 0, status: 'under' },
  ]

  const revenueProjections = {
    currentMonth: 2500,
    projected: 10000,
    growth: '+300%'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under': return 'text-green-400'
      case 'over': return 'text-red-400'
      case 'on-track': return 'text-cosmic-cyan'
      default: return 'text-cosmic-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'over': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'on-track': return <TrendingUp className="w-4 h-4 text-cosmic-cyan" />
      default: return null
    }
  }

  const totalBudgeted = monthlyExpenses.reduce((sum, expense) => sum + expense.budgeted, 0)
  const totalActual = monthlyExpenses.reduce((sum, expense) => sum + expense.actual, 0)
  const savings = totalBudgeted - totalActual

  return (
    <div className="space-y-8">
      {/* Revenue Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-cosmic-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-cosmic-cyan" />
          Revenue Tracking
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-cosmic-purple/20 rounded-lg border border-cosmic-purple/30">
            <p className="text-2xl font-bold text-cosmic-white">${revenueProjections.currentMonth.toLocaleString()}</p>
            <p className="text-sm text-cosmic-white/70">Current Month</p>
          </div>
          <div className="text-center p-4 bg-cosmic-cyan/20 rounded-lg border border-cosmic-cyan/30">
            <p className="text-2xl font-bold text-cosmic-white">${revenueProjections.projected.toLocaleString()}</p>
            <p className="text-sm text-cosmic-white/70">Projected (Q4)</p>
          </div>
          <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
            <p className="text-2xl font-bold text-green-400">{revenueProjections.growth}</p>
            <p className="text-sm text-cosmic-white/70">Growth Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Expense Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-cosmic-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cosmic-cyan" />
          Monthly Expense Breakdown
        </h3>
        
        <div className="space-y-4">
          {monthlyExpenses.map((expense, index) => (
            <motion.div
              key={expense.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(expense.status)}
                <span className="text-cosmic-white font-medium">{expense.category}</span>
              </div>
              
              <div className="text-right">
                <p className="text-cosmic-white font-bold">
                  ${expense.actual} / ${expense.budgeted}
                </p>
                <p className={`text-sm ${getStatusColor(expense.status)}`}>
                  {expense.status === 'under' && `$${expense.budgeted - expense.actual} under budget`}
                  {expense.status === 'over' && `$${expense.actual - expense.budgeted} over budget`}
                  {expense.status === 'on-track' && 'On track'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-lg font-bold text-cosmic-white">${totalBudgeted.toLocaleString()}</p>
              <p className="text-sm text-cosmic-white/70">Total Budgeted</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-lg font-bold text-green-400">${savings.toLocaleString()}</p>
              <p className="text-sm text-cosmic-white/70">Current Savings</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button 
          onClick={() => window.open('/FINANCIAL_PLANNING.md', '_blank')}
          variant="outline"
          className="border-cosmic-cyan/50 text-cosmic-cyan hover:bg-cosmic-cyan/10"
        >
          View Full Financial Plan
        </Button>
        
        <Button 
          onClick={() => window.open('/terms', '_blank')}
          variant="outline"
          className="border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-purple/10"
        >
          Legal Protection Status
        </Button>
      </motion.div>

      {/* Watermark */}
      <div className="text-center text-xs text-cosmic-white/30 py-4 border-t border-white/5">
        Built by Nemurium AI Engine | © 2025 iMMerSive Technologies, LLC
      </div>
    </div>
  )
}