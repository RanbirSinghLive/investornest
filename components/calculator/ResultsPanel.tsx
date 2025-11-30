'use client'

import React, { useState } from 'react'
import { SummaryCards } from './SummaryCards'
import { Chart } from './Chart'
import { NarrativeOutput } from './NarrativeOutput'
import { SensitivityAnalysis } from './SensitivityAnalysis'
import { CalculationDetails } from './CalculationDetails'
import { Button } from '../ui/Button'
import type { CalculationResults, CalculatorInputs } from '@/lib/types'

interface ResultsPanelProps {
  results: CalculationResults | null
  showRealTerms: boolean
  inputs: CalculatorInputs
}

export function ResultsPanel({ results, showRealTerms, inputs }: ResultsPanelProps) {
  const [showSensitivity, setShowSensitivity] = useState(false)
  const [showCalculationDetails, setShowCalculationDetails] = useState(false)

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

      {/* Calculation Details Toggle */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-900">Calculation methodology</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showCalculationDetails}
            onChange={(e) => setShowCalculationDetails(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Calculation Details */}
      <CalculationDetails isVisible={showCalculationDetails} />
    </div>
  )
}

