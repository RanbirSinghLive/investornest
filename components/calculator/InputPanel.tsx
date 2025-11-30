'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { Input } from '../ui/Input'
import { Slider } from '../ui/Slider'
import { Card } from '../ui/Card'
import type {
  CalculatorInputs,
  ExtraPaymentFrequency,
} from '@/lib/types'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'

interface InputPanelProps {
  inputs: CalculatorInputs
  onChange: (inputs: CalculatorInputs) => void
}

export function InputPanel({ inputs, onChange }: InputPanelProps) {
  const handleChange = useCallback(
    (
      field: keyof CalculatorInputs,
      value: number | ExtraPaymentFrequency | boolean
    ) => {
      onChange({ ...inputs, [field]: value })
    },
    [inputs, onChange]
  )

  return (
    <Card className="space-y-6">
      {/* 1. Money to Allocate */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Money to Allocate</h2>
        <div className="space-y-4">
          <div>
            <Slider
              label="Money to Allocate"
              value={inputs.extraPayment}
              min={0}
              max={100000}
              step={1000}
              formatValue={formatCurrency}
              onChange={(e) => handleChange('extraPayment', Number(e.target.value))}
            />
            <Input
              type="number"
              value={inputs.extraPayment}
              min={0}
              max={100000}
              step={1000}
              onChange={(e) => handleChange('extraPayment', Number(e.target.value))}
              className="mt-2"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allocation Frequency
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
                'Allocation applied every month'}
              {inputs.extraPaymentFrequency === 'annual' &&
                'Allocation applied once per year (at end of year)'}
              {inputs.extraPaymentFrequency === 'one-time' &&
                'Allocation applied only in the first month'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Invest Section */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Invest</h3>
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
              value={inputs.expectedReturn}
              min={0}
              max={15}
              step={0.1}
              onChange={(e) => handleChange('expectedReturn', Number(e.target.value))}
              className="mt-2"
              placeholder="Enter percentage"
            />
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select
              </label>
              <select
                value=""
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    handleChange('expectedReturn', Number(value))
                    // Reset dropdown to show placeholder
                    e.target.value = ''
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                <option value="">Select a preset...</option>
                <option value="3">Conservative (3%)</option>
                <option value="5">Typical balanced portfolio (5%)</option>
                <option value="7">Aggressive (7%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Nest (Mortgage) Section */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Nest (Mortgage)</h3>
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
              value={inputs.loanBalance}
              min={10000}
              max={2000000}
              step={10000}
              onChange={(e) => handleChange('loanBalance', Number(e.target.value))}
              className="mt-2"
              placeholder="Enter amount"
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
              value={inputs.interestRate}
              min={0}
              max={20}
              step={0.1}
              onChange={(e) => handleChange('interestRate', Number(e.target.value))}
              className="mt-2"
              placeholder="Enter percentage"
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
                value={inputs.yearsRemaining}
                min={0}
                max={50}
                step={1}
                onChange={(e) => handleChange('yearsRemaining', Number(e.target.value))}
                className="mt-2"
                placeholder="Enter years"
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
                placeholder="Enter months"
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
              value={inputs.regularPayment}
              min={100}
              max={10000}
              step={100}
              onChange={(e) => handleChange('regularPayment', Number(e.target.value))}
              className="mt-2"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>

      {/* 4. Optionals */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Optionals</h3>
        <div className="space-y-4">
          {/* Optional: Home Value & Appreciation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Home Value & Appreciation
                </label>
                <p className="text-xs text-gray-500">
                  Include home value appreciation in net worth calculations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.useHomeValue}
                  onChange={(e) => handleChange('useHomeValue', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {inputs.useHomeValue && (
              <div className="space-y-4 mt-4">
                <div>
                  <Slider
                    label="Current Home Value"
                    value={inputs.currentHomeValue}
                    min={10000}
                    max={5000000}
                    step={10000}
                    formatValue={formatCurrency}
                    onChange={(e) => handleChange('currentHomeValue', Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    value={inputs.currentHomeValue}
                    min={10000}
                    max={10000000}
                    step={10000}
                    onChange={(e) => handleChange('currentHomeValue', Number(e.target.value))}
                    className="mt-2"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <Slider
                    label="Expected Home Appreciation"
                    value={inputs.homeAppreciationRate}
                    min={0}
                    max={10}
                    step={0.1}
                    formatValue={(v) => formatPercentage(v, 1)}
                    onChange={(e) => handleChange('homeAppreciationRate', Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    value={inputs.homeAppreciationRate}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => handleChange('homeAppreciationRate', Number(e.target.value))}
                    className="mt-2"
                    placeholder="Enter percentage"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Optional: Inflation Adjustment */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Show Results in Real Terms (Inflation-Adjusted)
                </label>
                <p className="text-xs text-gray-500">
                  Convert all values to today's purchasing power
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.showRealTerms}
                  onChange={(e) => handleChange('showRealTerms', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {inputs.showRealTerms && (
              <div className="mt-4">
                <Slider
                  label="Annual Inflation Rate"
                  value={inputs.inflationRate}
                  min={0}
                  max={5}
                  step={0.1}
                  formatValue={(v) => formatPercentage(v, 1)}
                  onChange={(e) => handleChange('inflationRate', Number(e.target.value))}
                />
                <Input
                  type="number"
                  value={inputs.inflationRate}
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(e) => handleChange('inflationRate', Number(e.target.value))}
                  className="mt-2"
                  placeholder="Enter percentage"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

