'use client'

import React, { useMemo } from 'react'
import { Card } from '../ui/Card'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'
import type { CalculatorInputs } from '@/lib/types'
import { generateSensitivityAnalysis } from '@/lib/calculations/sensitivity'

interface SensitivityAnalysisProps {
  inputs: CalculatorInputs
}

export function SensitivityAnalysis({ inputs }: SensitivityAnalysisProps) {
  const analysis = useMemo(() => {
    console.log('🔄 Calculating sensitivity analysis...')
    return generateSensitivityAnalysis(inputs)
  }, [inputs])

  const getWinnerColor = (winner: 'prepay' | 'invest' | 'tie') => {
    switch (winner) {
      case 'invest':
        return 'text-primary-600 font-semibold'
      case 'prepay':
        return 'text-secondary-600 font-semibold'
      case 'tie':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getWinnerText = (winner: 'prepay' | 'invest' | 'tie') => {
    switch (winner) {
      case 'invest':
        return 'Invest'
      case 'prepay':
        return 'Prepay'
      case 'tie':
        return 'Tie'
      default:
        return 'Tie'
    }
  }

  return (
    <Card>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Sensitivity Analysis
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        See how the break-even point shifts when key assumptions change.
      </p>

      {/* Baseline */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Baseline (Current Inputs)</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Break-Even Return:</span>
            <span className="ml-2 font-semibold">
              {formatPercentage(analysis.baseline.breakEvenReturn, 2)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Net Worth Difference:</span>
            <span className="ml-2 font-semibold">
              {formatCurrency(analysis.baseline.netWorthDifference)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Winner:</span>
            <span className={`ml-2 ${getWinnerColor(analysis.baseline.winner)}`}>
              {getWinnerText(analysis.baseline.winner)}
            </span>
          </div>
        </div>
      </div>

      {/* Scenarios Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 font-semibold text-gray-700">Scenario</th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700">Description</th>
              <th className="text-right py-2 px-3 font-semibold text-gray-700">
                Break-Even Return
              </th>
              <th className="text-right py-2 px-3 font-semibold text-gray-700">
                Net Worth Diff
              </th>
              <th className="text-center py-2 px-3 font-semibold text-gray-700">Winner</th>
            </tr>
          </thead>
          <tbody>
            {analysis.scenarios.map((scenario, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-3 font-medium text-gray-900">{scenario.label}</td>
                <td className="py-2 px-3 text-gray-600">{scenario.description}</td>
                <td className="py-2 px-3 text-right font-mono">
                  {formatPercentage(scenario.breakEvenReturn, 2)}
                </td>
                <td
                  className={`py-2 px-3 text-right font-mono ${
                    scenario.netWorthDifference > 0
                      ? 'text-primary-600'
                      : scenario.netWorthDifference < 0
                        ? 'text-secondary-600'
                        : 'text-gray-600'
                  }`}
                >
                  {scenario.netWorthDifference > 0 ? '+' : ''}
                  {formatCurrency(scenario.netWorthDifference)}
                </td>
                <td className="py-2 px-3 text-center">
                  <span className={getWinnerColor(scenario.winner)}>
                    {getWinnerText(scenario.winner)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500 italic">
        Break-even return is the investment return % where both strategies yield equal net worth.
        Lower break-even = investing is more attractive.
      </p>
    </Card>
  )
}

