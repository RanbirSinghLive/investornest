'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '../ui/Card'
import { formatCurrency } from '@/lib/utils/formatters'
import type { CalculationResults } from '@/lib/types'

interface ChartProps {
  results: CalculationResults
  showRealTerms: boolean
}

export function Chart({ results, showRealTerms }: ChartProps) {
  const { prepayStrategy, investStrategy } = results

  // Prepare data for chart - sample every 12 months (yearly)
  const prepayData = prepayStrategy.monthlyBreakdown
  const investData = investStrategy.monthlyBreakdown
  
  const chartData = prepayData
    .filter((_, index) => index % 12 === 0 || index === prepayData.length - 1)
    .map((prepay, index) => {
      // Find corresponding invest data point by month number
      const investPoint = investData.find(d => d.month === prepay.month) || investData[investData.length - 1]
      return {
        year: Math.floor(prepay.month / 12),
        month: prepay.month,
        prepay: Math.round(prepay.netWorth),
        invest: Math.round(investPoint?.netWorth || 0),
      }
    })

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">Month {payload[0].payload.month}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Net Worth Over Time{showRealTerms && ' (Inflation-Adjusted)'}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{
              value: showRealTerms ? 'Net Worth (CAD, Real Terms)' : 'Net Worth (CAD)',
              angle: -90,
              position: 'insideLeft',
            }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="prepay"
            stroke="#16a34a"
            strokeWidth={2}
            name="Prepay Strategy"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="invest"
            stroke="#0ea5e9"
            strokeWidth={2}
            name="Invest Strategy"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

