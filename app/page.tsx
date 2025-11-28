'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { InputPanel } from '@/components/calculator/InputPanel'
import { ResultsPanel } from '@/components/calculator/ResultsPanel'
import { calculateComparison } from '@/lib/calculations/comparison'
import type { CalculatorInputs } from '@/lib/types'
import { loadPreferences, savePreferences } from '@/lib/utils/storage'

const DEFAULT_INPUTS: CalculatorInputs = {
  loanBalance: 400000,
  interestRate: 5.5,
  yearsRemaining: 25,
  monthsRemaining: 0,
  regularPayment: 2500,
  extraPayment: 500,
  extraPaymentFrequency: 'monthly',
  expectedReturn: 7,
  comparisonHorizon: 20,
}

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [isCalculating, setIsCalculating] = useState(false)

  // Load preferences on mount
  useEffect(() => {
    console.log('🔍 Loading saved preferences...')
    const preferences = loadPreferences()
    if (preferences.interestRate || preferences.expectedReturn || preferences.comparisonHorizon) {
      console.log('✅ Loaded preferences:', preferences)
      setInputs((prev) => ({
        ...prev,
        interestRate: preferences.interestRate ?? prev.interestRate,
        expectedReturn: preferences.expectedReturn ?? prev.expectedReturn,
        comparisonHorizon: preferences.comparisonHorizon ?? prev.comparisonHorizon,
      }))
    } else {
      console.log('ℹ️ No saved preferences found, using defaults')
    }
  }, [])

  // Save preferences when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('💾 Saving preferences...')
      savePreferences({
        interestRate: inputs.interestRate,
        expectedReturn: inputs.expectedReturn,
        comparisonHorizon: inputs.comparisonHorizon,
      })
      console.log('✅ Preferences saved')
    }, 1000)

    return () => clearTimeout(timer)
  }, [inputs.interestRate, inputs.expectedReturn, inputs.comparisonHorizon])

  // Calculate results with memoization
  const results = useMemo(() => {
    console.log('📊 Recalculating with new inputs...')
    setIsCalculating(true)
    try {
      const calculated = calculateComparison(inputs)
      console.log('✅ Calculation completed successfully')
      return calculated
    } catch (error) {
      console.error('❌ Calculation error:', error)
      return null
    } finally {
      setIsCalculating(false)
    }
  }, [inputs])

  const handleInputChange = useCallback((newInputs: CalculatorInputs) => {
    setInputs(newInputs)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Should I Pay Off My Mortgage or Invest?
          </h1>
          <p className="text-lg text-gray-600">
            Compare prepaying your mortgage vs investing your extra payment. Built for Canadian
            homeowners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <InputPanel inputs={inputs} onChange={handleInputChange} />
          </div>
          <div>
            {isCalculating ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500">Calculating...</p>
              </div>
            ) : (
              <ResultsPanel results={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

