'use client'

import React, { useState } from 'react'
import { SummaryCards } from './SummaryCards'
import { Chart } from './Chart'
import { NarrativeOutput } from './NarrativeOutput'
import { SensitivityAnalysis } from './SensitivityAnalysis'
import { Button } from '../ui/Button'
import type { CalculationResults, CalculatorInputs } from '@/lib/types'

interface ResultsPanelProps {
  results: CalculationResults | null
  showRealTerms: boolean
  inputs: CalculatorInputs
}

export function ResultsPanel({ results, showRealTerms, inputs }: ResultsPanelProps) {
  const [showSensitivity, setShowSensitivity] = useState(false)

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">
          Adjust the inputs on the left to see your comparison results.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showRealTerms && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <strong>ℹ️ Real Terms:</strong> All values shown are inflation-adjusted to today's purchasing power.
        </div>
      )}
      <SummaryCards results={results} showRealTerms={showRealTerms} />
      <Chart results={results} showRealTerms={showRealTerms} />
      <NarrativeOutput results={results} />

      {/* Sensitivity Analysis Toggle */}
      <div className="flex justify-center">
        <Button
          variant={showSensitivity ? 'secondary' : 'outline'}
          onClick={() => setShowSensitivity(!showSensitivity)}
        >
          {showSensitivity ? 'Hide' : 'Show'} Sensitivity Analysis
        </Button>
      </div>

      {/* Sensitivity Analysis */}
      {showSensitivity && <SensitivityAnalysis inputs={inputs} />}
    </div>
  )
}

