'use client'

import React, { useCallback, useMemo } from 'react'
import { Input } from '../ui/Input'
import { Slider } from '../ui/Slider'
import { Card } from '../ui/Card'
import type {
  CalculatorInputs,
  ExtraPaymentFrequency,
  InvestmentAccountType,
  CanadianProvince,
} from '@/lib/types'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'
import { getTaxRateInfo } from '@/lib/calculations/tax'

interface InputPanelProps {
  inputs: CalculatorInputs
  onChange: (inputs: CalculatorInputs) => void
}

export function InputPanel({ inputs, onChange }: InputPanelProps) {
  const handleChange = useCallback(
    (
      field: keyof CalculatorInputs,
      value: number | ExtraPaymentFrequency | InvestmentAccountType | CanadianProvince
    ) => {
      onChange({ ...inputs, [field]: value })
    },
    [inputs, onChange]
  )

  const taxInfo = useMemo(
    () =>
      getTaxRateInfo(inputs.grossIncome || 0, inputs.province, inputs.investmentAccountType),
    [inputs.grossIncome, inputs.province, inputs.investmentAccountType]
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
              label="Expected Annual Return (Gross)"
              value={inputs.expectedReturn}
              min={0}
              max={15}
              step={0.1}
              formatValue={(v) => formatPercentage(v, 1)}
              onChange={(e) => handleChange('expectedReturn', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Expected Annual Return - Gross (%)"
              value={inputs.expectedReturn}
              min={0}
              max={15}
              step={0.1}
              onChange={(e) => handleChange('expectedReturn', Number(e.target.value))}
              className="mt-2"
              helperText="Gross return before tax. Net return will be calculated based on account type and tax rates."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Account Type
            </label>
            <select
              value={inputs.investmentAccountType}
              onChange={(e) =>
                handleChange('investmentAccountType', e.target.value as InvestmentAccountType)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="TFSA">TFSA (Tax-Free Savings Account)</option>
              <option value="FHSA">FHSA (First Home Savings Account)</option>
              <option value="RRSP">RRSP (Registered Retirement Savings Plan)</option>
              <option value="RESP">RESP (Registered Education Savings Plan)</option>
              <option value="non-registered">Non-Registered Account</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {inputs.investmentAccountType === 'TFSA' &&
                'Tax-free: No tax on growth or withdrawal'}
              {inputs.investmentAccountType === 'FHSA' &&
                'Tax-free: No tax on growth or withdrawal (if used for first home)'}
              {inputs.investmentAccountType === 'RRSP' &&
                'Tax-deferred: Taxed on withdrawal at marginal rate'}
              {inputs.investmentAccountType === 'RESP' &&
                'Tax-deferred: Taxed on withdrawal at beneficiary\'s rate'}
              {inputs.investmentAccountType === 'non-registered' &&
                'Taxable: Capital gains (50% inclusion) and dividends taxed annually'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
            <select
              value={inputs.province}
              onChange={(e) =>
                handleChange('province', e.target.value as CanadianProvince)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Used to calculate provincial tax rates
            </p>
          </div>

          <div>
            <Slider
              label="Gross Annual Income"
              value={inputs.grossIncome}
              min={0}
              max={500000}
              step={1000}
              formatValue={formatCurrency}
              onChange={(e) => handleChange('grossIncome', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Gross Annual Income (CAD)"
              value={inputs.grossIncome}
              min={0}
              max={500000}
              step={1000}
              onChange={(e) => handleChange('grossIncome', Number(e.target.value))}
              className="mt-2"
              helperText="Used to determine your marginal tax bracket"
            />
            <p className="mt-1 text-sm text-gray-600">
              Approx. combined marginal tax rate:{' '}
              <span className="font-semibold">
                {(taxInfo.combinedRate * 100).toFixed(1)}%
              </span>{' '}
              <span className="text-gray-500">
                ({(taxInfo.federalRate * 100).toFixed(1)}% federal +{' '}
                {(taxInfo.provincialRate * 100).toFixed(1)}% provincial)
              </span>
            </p>
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
              label="Expected Home Appreciation (%)"
              value={inputs.homeAppreciationRate}
              min={0}
              max={10}
              step={0.1}
              onChange={(e) => handleChange('homeAppreciationRate', Number(e.target.value))}
              className="mt-2"
              helperText="Annual home value appreciation rate. Shows how home equity growth affects net worth."
            />
          </div>

          <div className="border-t pt-4 mt-4">
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
                  label="Annual Inflation Rate (%)"
                  value={inputs.inflationRate}
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(e) => handleChange('inflationRate', Number(e.target.value))}
                  className="mt-2"
                  helperText="Default: 2%. Adjust to reflect your inflation expectations."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

