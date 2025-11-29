'use client'

import React from 'react'
import { Card } from '../ui/Card'
import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils/formatters'
import type { CalculationResults } from '@/lib/types'

interface SummaryCardsProps {
  results: CalculationResults
  showRealTerms: boolean
}

export function SummaryCards({ results, showRealTerms }: SummaryCardsProps) {
  const { prepayStrategy, investStrategy, comparison } = results

  const winnerText = {
    prepay: 'Prepay Mortgage',
    invest: 'Invest Extra Payment',
    tie: 'Tie',
  }

  const winnerColor = {
    prepay: 'text-secondary-600',
    invest: 'text-primary-600',
    tie: 'text-gray-600',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-sm font-medium text-gray-600 mb-1">Winner</div>
        <div className={`text-2xl font-bold ${winnerColor[comparison.winner]}`}>
          {winnerText[comparison.winner]}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          {Math.abs(comparison.netWorthDifference) > 1000
            ? `${formatCurrency(Math.abs(comparison.netWorthDifference))} difference`
            : 'Very close results'}
        </div>
      </Card>

      <Card>
        <div className="text-sm font-medium text-gray-600 mb-1">Net Worth Difference</div>
        <div
          className={`text-2xl font-bold ${
            comparison.netWorthDifference > 0 ? 'text-primary-600' : 'text-secondary-600'
          }`}
        >
          {comparison.netWorthDifference > 0 ? '+' : ''}
          {formatCurrency(comparison.netWorthDifference)}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          {comparison.netWorthDifference > 0
            ? 'Investing wins'
            : comparison.netWorthDifference < 0
              ? 'Prepaying wins'
              : 'Tie'}
        </div>
      </Card>

      <Card>
        <div className="text-sm font-medium text-gray-600 mb-1">Break-Even Return</div>
        <div className="text-2xl font-bold text-gray-900">
          {formatPercentage(comparison.breakEvenReturn, 2)}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Return needed for strategies to be equal
        </div>
      </Card>

      <Card>
        <div className="text-sm font-medium text-gray-600 mb-1">Prepay Mortgage-Free Date</div>
        <div className="text-lg font-bold text-gray-900">
          {prepayStrategy.mortgageFreeDate
            ? formatDate(prepayStrategy.mortgageFreeDate)
            : 'Not calculated'}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          {investStrategy.mortgageFreeDate && prepayStrategy.mortgageFreeDate
            ? `${
                Math.ceil(
                  (investStrategy.mortgageFreeDate.getTime() -
                    prepayStrategy.mortgageFreeDate.getTime()) /
                    (1000 * 60 * 60 * 24 * 365)
                )
              } years earlier than investing`
            : ''}
        </div>
      </Card>
    </div>
  )
}

