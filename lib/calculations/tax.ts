/**
 * Canadian tax calculation functions
 * Federal and provincial marginal tax rates for 2024/2025 tax year
 */

import type { CanadianProvince, InvestmentAccountType } from '../types'

/**
 * Tax bracket structure
 */
interface TaxBracket {
  min: number
  max: number | null // null means no upper limit
  rate: number // Tax rate as decimal (e.g., 0.15 for 15%)
}

/**
 * Federal tax brackets for 2024
 */
const FEDERAL_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: null, rate: 0.33 },
]

/**
 * Provincial tax brackets for 2024
 * Key: Province code, Value: Array of tax brackets
 */
const PROVINCIAL_TAX_BRACKETS: Record<CanadianProvince, TaxBracket[]> = {
  AB: [
    { min: 0, max: 148269, rate: 0.1 },
    { min: 148269, max: 177922, rate: 0.12 },
    { min: 177922, max: 237230, rate: 0.13 },
    { min: 237230, max: 355845, rate: 0.14 },
    { min: 355845, max: null, rate: 0.15 },
  ],
  BC: [
    { min: 0, max: 47937, rate: 0.0506 },
    { min: 47937, max: 95875, rate: 0.077 },
    { min: 95875, max: 110076, rate: 0.105 },
    { min: 110076, max: 133664, rate: 0.1229 },
    { min: 133664, max: 181232, rate: 0.147 },
    { min: 181232, max: 252752, rate: 0.168 },
    { min: 252752, max: null, rate: 0.205 },
  ],
  MB: [
    { min: 0, max: 47000, rate: 0.108 },
    { min: 47000, max: 100000, rate: 0.1275 },
    { min: 100000, max: null, rate: 0.174 },
  ],
  NB: [
    { min: 0, max: 52810, rate: 0.094 },
    { min: 52810, max: 105620, rate: 0.14 },
    { min: 105620, max: 161063, rate: 0.16 },
    { min: 161063, max: null, rate: 0.195 },
  ],
  NL: [
    { min: 0, max: 43198, rate: 0.087 },
    { min: 43198, max: 86395, rate: 0.145 },
    { min: 86395, max: 154244, rate: 0.158 },
    { min: 154244, max: 215943, rate: 0.173 },
    { min: 215943, max: null, rate: 0.183 },
  ],
  NS: [
    { min: 0, max: 29590, rate: 0.0879 },
    { min: 29590, max: 59180, rate: 0.1495 },
    { min: 59180, max: 93000, rate: 0.1667 },
    { min: 93000, max: 150000, rate: 0.175 },
    { min: 150000, max: null, rate: 0.21 },
  ],
  NT: [
    { min: 0, max: 50877, rate: 0.059 },
    { min: 50877, max: 101754, rate: 0.086 },
    { min: 101754, max: 165429, rate: 0.122 },
    { min: 165429, max: null, rate: 0.1405 },
  ],
  NU: [
    { min: 0, max: 50877, rate: 0.04 },
    { min: 50877, max: 101754, rate: 0.07 },
    { min: 101754, max: 165429, rate: 0.09 },
    { min: 165429, max: null, rate: 0.115 },
  ],
  ON: [
    { min: 0, max: 51446, rate: 0.0505 },
    { min: 51446, max: 102894, rate: 0.0915 },
    { min: 102894, max: 150000, rate: 0.1116 },
    { min: 150000, max: 220000, rate: 0.1216 },
    { min: 220000, max: null, rate: 0.1316 },
  ],
  PE: [
    { min: 0, max: 32656, rate: 0.098 },
    { min: 32656, max: 65312, rate: 0.138 },
    { min: 65312, max: 105000, rate: 0.167 },
    { min: 105000, max: null, rate: 0.18 },
  ],
  QC: [
    { min: 0, max: 51480, rate: 0.14 },
    { min: 51480, max: 102975, rate: 0.19 },
    { min: 102975, max: 123780, rate: 0.24 },
    { min: 123780, max: null, rate: 0.2575 },
  ],
  SK: [
    { min: 0, max: 52057, rate: 0.105 },
    { min: 52057, max: 148734, rate: 0.125 },
    { min: 148734, max: null, rate: 0.145 },
  ],
  YT: [
    { min: 0, max: 55867, rate: 0.064 },
    { min: 55867, max: 111733, rate: 0.09 },
    { min: 111733, max: 173205, rate: 0.109 },
    { min: 173205, max: 500000, rate: 0.128 },
    { min: 500000, max: null, rate: 0.15 },
  ],
}

/**
 * Calculate marginal tax rate for a given income
 */
function calculateMarginalRate(income: number, brackets: TaxBracket[]): number {
  for (let i = brackets.length - 1; i >= 0; i--) {
    const bracket = brackets[i]
    if (income >= bracket.min && (bracket.max === null || income <= bracket.max)) {
      return bracket.rate
    }
  }
  // Fallback to lowest bracket
  return brackets[0].rate
}

/**
 * Calculate combined federal + provincial marginal tax rate
 */
export function calculateCombinedMarginalRate(
  income: number,
  province: CanadianProvince
): number {
  const federalRate = calculateMarginalRate(income, FEDERAL_TAX_BRACKETS)
  const provincialBrackets = PROVINCIAL_TAX_BRACKETS[province]
  const provincialRate = calculateMarginalRate(income, provincialBrackets)

  // Combined rate (federal + provincial)
  return federalRate + provincialRate
}

/**
 * Calculate effective tax rate based on account type
 * This is a simplified calculation - actual tax treatment can be more complex
 */
export function calculateEffectiveTaxRate(
  accountType: InvestmentAccountType,
  marginalRate: number
): number {
  switch (accountType) {
    case 'TFSA':
    case 'FHSA':
      // Tax-free: no tax on growth or withdrawal
      return 0

    case 'RRSP':
      // Tax-deferred: assume withdrawal at same marginal rate
      // Simplified: we assume the tax is deferred but will be paid on withdrawal
      // For comparison purposes, we use the marginal rate
      return marginalRate

    case 'RESP':
      // Tax-deferred: taxed on withdrawal at beneficiary's rate
      // Simplified: assume beneficiary's rate is same as contributor's
      return marginalRate

    case 'non-registered':
      // Capital gains: 50% inclusion rate
      // Dividends: gross-up and dividend tax credit (simplified to capital gains rate)
      // For simplicity, we use capital gains rate
      return marginalRate * 0.5

    default:
      return marginalRate
  }
}

/**
 * Calculate net return after tax
 */
export function calculateNetReturn(
  grossReturn: number,
  accountType: InvestmentAccountType,
  income: number,
  province: CanadianProvince
): number {
  const marginalRate = calculateCombinedMarginalRate(income, province)
  const effectiveRate = calculateEffectiveTaxRate(accountType, marginalRate)
  const netReturn = grossReturn * (1 - effectiveRate)

  console.log(
    `💰 Tax calculation: Gross=${grossReturn.toFixed(2)}%, Marginal=${(marginalRate * 100).toFixed(2)}%, Effective=${(effectiveRate * 100).toFixed(2)}%, Net=${netReturn.toFixed(2)}%`
  )

  return netReturn
}

/**
 * Get tax rate information for display
 */
export function getTaxRateInfo(
  income: number,
  province: CanadianProvince,
  accountType: InvestmentAccountType
): {
  federalRate: number
  provincialRate: number
  combinedRate: number
  effectiveRate: number
} {
  const federalRate = calculateMarginalRate(income, FEDERAL_TAX_BRACKETS)
  const provincialBrackets = PROVINCIAL_TAX_BRACKETS[province]
  const provincialRate = calculateMarginalRate(income, provincialBrackets)
  const combinedRate = federalRate + provincialRate
  const effectiveRate = calculateEffectiveTaxRate(accountType, combinedRate)

  return {
    federalRate,
    provincialRate,
    combinedRate,
    effectiveRate,
  }
}

