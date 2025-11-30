'use client'

import React from 'react'
import { Card } from '../ui/Card'

interface CalculationDetailsProps {
  isVisible: boolean
}

export function CalculationDetails({ isVisible }: CalculationDetailsProps) {
  if (!isVisible) return null

  return (
    <Card className="mt-4 bg-gray-50 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">Calculation Methodology</h4>
      
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h5 className="font-semibold text-gray-900 mb-1">Mortgage Amortization (Canadian Standard)</h5>
          <p className="mb-2">Uses semi-annual compounding as per Canadian banking standards:</p>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs">
            <div className="mb-1">Monthly Rate = (1 + Annual Rate / 2)^(2/12) - 1</div>
            <div className="mb-1">Monthly Payment = Principal × (rate × (1 + rate)^n) / ((1 + rate)^n - 1)</div>
            <div>Where n = number of months remaining</div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-1">Investment Growth</h5>
          <p className="mb-2">Future value of annuity with monthly compounding:</p>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs">
            <div className="mb-1">FV = PMT × [((1 + r)^n - 1) / r]</div>
            <div className="mb-1">Where:</div>
            <div className="ml-2">• PMT = Monthly contribution</div>
            <div className="ml-2">• r = Monthly return rate (annual return / 12)</div>
            <div className="ml-2">• n = Number of months</div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-1">Net Worth Calculation</h5>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs">
            <div className="mb-1">Net Worth = Home Equity + Investment Balance</div>
            <div className="mb-1">Home Equity = Home Value - Mortgage Balance</div>
            <div>Home Value = Current Value × (1 + appreciation_rate)^(years)</div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-1">Inflation Adjustment (Real Terms)</h5>
          <p className="mb-2">When "Show Results in Real Terms" is enabled:</p>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs">
            <div>Real Value = Nominal Value / (1 + inflation_rate)^(months / 12)</div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-1">Break-Even Return</h5>
          <p className="mb-2">The investment return % where both strategies yield equal net worth:</p>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs">
            <div>Calculated using binary search to find return rate where:</div>
            <div className="ml-2">Net Worth (Invest Strategy) = Net Worth (Prepay Strategy)</div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-300">
          <p className="text-xs text-gray-600 italic">
            All calculations are performed client-side. No data is sent to any server.
          </p>
        </div>
      </div>
    </Card>
  )
}

