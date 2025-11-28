'use client'

import React, { useCallback } from 'react'
import { Input } from '../ui/Input'
import { Slider } from '../ui/Slider'
import { Card } from '../ui/Card'
import type { CalculatorInputs, ExtraPaymentFrequency } from '@/lib/types'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'

interface InputPanelProps {
  inputs: CalculatorInputs
  onChange: (inputs: CalculatorInputs) => void
}

export function InputPanel({ inputs, onChange }: InputPanelProps) {
  const handleChange = useCallback(
    (field: keyof CalculatorInputs, value: number | ExtraPaymentFrequency) => {
      onChange({ ...inputs, [field]: value })
    },
    [inputs, onChange]
  )

  return (
    <Card className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mortgage Details</h2>

      <div className="space-y-4">
        <div>
          <Slider
            label="Loan Balance"
            value={inputs.loanBalance}
            min={10000}
            max={2000000}
            step={10000}
            formatValue={formatCurrency}
            onChange={(e) => handleChange('loanBalance', Number(e.target.value))}
          />
          <Input
            type="number"
            label="Loan Balance (CAD)"
            value={inputs.loanBalance}
            min={10000}
            max={2000000}
            step={10000}
            onChange={(e) => handleChange('loanBalance', Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div>
          <Slider
            label="Interest Rate"
            value={inputs.interestRate}
            min={0}
            max={20}
            step={0.1}
            formatValue={(v) => formatPercentage(v, 2)}
            onChange={(e) => handleChange('interestRate', Number(e.target.value))}
          />
          <Input
            type="number"
            label="Annual Interest Rate (%)"
            value={inputs.interestRate}
            min={0}
            max={20}
            step={0.1}
            onChange={(e) => handleChange('interestRate', Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Slider
              label="Years Remaining"
              value={inputs.yearsRemaining}
              min={0}
              max={50}
              step={1}
              formatValue={(v) => `${v} years`}
              onChange={(e) => handleChange('yearsRemaining', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Years Remaining"
              value={inputs.yearsRemaining}
              min={0}
              max={50}
              step={1}
              onChange={(e) => handleChange('yearsRemaining', Number(e.target.value))}
              className="mt-2"
            />
          </div>
          <div>
            <Slider
              label="Months Remaining"
              value={inputs.monthsRemaining}
              min={0}
              max={11}
              step={1}
              formatValue={(v) => `${v} months`}
              onChange={(e) => handleChange('monthsRemaining', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Months Remaining"
              value={inputs.monthsRemaining}
              min={0}
              max={11}
              step={1}
              onChange={(e) => {
                const months = Number(e.target.value)
                // Ensure months stay within 0-11 range
                const validMonths = Math.max(0, Math.min(11, months))
                handleChange('monthsRemaining', validMonths)
              }}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Slider
            label="Regular Monthly Payment"
            value={inputs.regularPayment}
            min={100}
            max={10000}
            step={100}
            formatValue={formatCurrency}
            onChange={(e) => handleChange('regularPayment', Number(e.target.value))}
          />
          <Input
            type="number"
            label="Regular Monthly Payment (CAD)"
            value={inputs.regularPayment}
            min={100}
            max={10000}
            step={100}
            onChange={(e) => handleChange('regularPayment', Number(e.target.value))}
            className="mt-2"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Extra Payment Options</h3>

        <div className="space-y-4">
          <div>
            <Slider
              label="Extra Payment Amount"
              value={inputs.extraPayment}
              min={0}
              max={5000}
              step={100}
              formatValue={formatCurrency}
              onChange={(e) => handleChange('extraPayment', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Extra Payment Amount (CAD)"
              value={inputs.extraPayment}
              min={0}
              max={5000}
              step={100}
              onChange={(e) => handleChange('extraPayment', Number(e.target.value))}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Frequency
            </label>
            <select
              value={inputs.extraPaymentFrequency}
              onChange={(e) =>
                handleChange('extraPaymentFrequency', e.target.value as ExtraPaymentFrequency)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual (once per year)</option>
              <option value="one-time">One-time (first month only)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {inputs.extraPaymentFrequency === 'monthly' &&
                'Extra payment applied every month'}
              {inputs.extraPaymentFrequency === 'annual' &&
                'Extra payment applied once per year (at end of year)'}
              {inputs.extraPaymentFrequency === 'one-time' &&
                'Extra payment applied only in the first month'}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Assumptions</h3>

        <div className="space-y-4">
          <div>
            <Slider
              label="Expected Annual Return"
              value={inputs.expectedReturn}
              min={0}
              max={15}
              step={0.1}
              formatValue={(v) => formatPercentage(v, 1)}
              onChange={(e) => handleChange('expectedReturn', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Expected Annual Return (%)"
              value={inputs.expectedReturn}
              min={0}
              max={15}
              step={0.1}
              onChange={(e) => handleChange('expectedReturn', Number(e.target.value))}
              className="mt-2"
            />
          </div>

          <div>
            <Slider
              label="Comparison Horizon"
              value={inputs.comparisonHorizon}
              min={5}
              max={30}
              step={1}
              formatValue={(v) => `${v} years`}
              onChange={(e) => handleChange('comparisonHorizon', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Comparison Horizon (Years)"
              value={inputs.comparisonHorizon}
              min={5}
              max={30}
              step={1}
              onChange={(e) => handleChange('comparisonHorizon', Number(e.target.value))}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

