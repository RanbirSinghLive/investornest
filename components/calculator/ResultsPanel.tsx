'use client'

import React from 'react'
import { SummaryCards } from './SummaryCards'
import { Chart } from './Chart'
import { NarrativeOutput } from './NarrativeOutput'
import type { CalculationResults } from '@/lib/types'

interface ResultsPanelProps {
  results: CalculationResults | null
}

export function ResultsPanel({ results }: ResultsPanelProps) {
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
      <SummaryCards results={results} />
      <Chart results={results} />
      <NarrativeOutput results={results} />
    </div>
  )
}

