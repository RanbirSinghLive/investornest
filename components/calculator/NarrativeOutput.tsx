'use client'

import React from 'react'
import { Card } from '../ui/Card'
import type { CalculationResults } from '@/lib/types'

interface NarrativeOutputProps {
  results: CalculationResults
}

export function NarrativeOutput({ results }: NarrativeOutputProps) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Summary</h3>
      <p className="text-gray-700 leading-relaxed">{results.comparison.narrative}</p>
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-sm text-gray-600 italic">
          This is an educational simulation based on Canadian mortgage standards (semi-annual
          compounding). Results are estimates and do not constitute financial advice. All
          calculations are performed locally on your device.
        </p>
      </div>
    </Card>
  )
}

