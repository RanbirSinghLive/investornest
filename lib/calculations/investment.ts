/**
 * Investment growth calculations
 * Supports monthly, annual, or one-time contributions with monthly compounding
 * Uses net return rate (after tax) for calculations
 */

import type { ExtraPaymentFrequency } from '../types'

/**
 * Calculate future value of investment with contributions
 * Uses compound interest formula
 */
export function calculateInvestmentGrowth(
  contribution: number,
  annualReturnRate: number,
  numberOfMonths: number,
  frequency: ExtraPaymentFrequency = 'monthly',
  initialBalance: number = 0
): number {
  if (annualReturnRate === 0) {
    if (frequency === 'monthly') {
      return initialBalance + contribution * numberOfMonths
    } else if (frequency === 'annual') {
      return initialBalance + contribution * Math.floor(numberOfMonths / 12)
    } else {
      return initialBalance + contribution
    }
  }

  const monthlyRate = annualReturnRate / 100 / 12
  let futureValue = initialBalance * Math.pow(1 + monthlyRate, numberOfMonths)

  if (frequency === 'monthly') {
    const futureValueOfAnnuity =
      contribution * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate)
    futureValue += futureValueOfAnnuity
  } else if (frequency === 'annual') {
    // Annual contributions at end of each year
    const numberOfYears = Math.floor(numberOfMonths / 12)
    for (let year = 1; year <= numberOfYears; year++) {
      const monthsRemaining = numberOfMonths - year * 12
      futureValue += contribution * Math.pow(1 + monthlyRate, monthsRemaining)
    }
  } else if (frequency === 'one-time') {
    // One-time contribution at the beginning
    futureValue += contribution * Math.pow(1 + monthlyRate, numberOfMonths)
  }

  return futureValue
}

/**
 * Calculate investment balance over time with contributions
 */
export function calculateInvestmentBreakdown(
  contribution: number,
  annualReturnRate: number,
  numberOfMonths: number,
  frequency: ExtraPaymentFrequency = 'monthly',
  initialBalance: number = 0
): number[] {
  const monthlyRate = annualReturnRate / 100 / 12
  const balances: number[] = []
  let balance = initialBalance

  for (let month = 0; month < numberOfMonths; month++) {
    // Apply monthly compounding
    balance = balance * (1 + monthlyRate)

    // Add contribution based on frequency
    if (frequency === 'monthly') {
      balance += contribution
    } else if (frequency === 'annual') {
      // Annual contribution at end of each year (month 12, 24, 36, etc.)
      if ((month + 1) % 12 === 0) {
        balance += contribution
      }
    } else if (frequency === 'one-time') {
      // One-time contribution only in first month
      if (month === 0) {
        balance += contribution
      }
    }

    balances.push(balance)
  }

  return balances
}

