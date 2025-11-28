/**
 * Canadian mortgage amortization calculations
 * Uses semi-annual compounding (Canadian standard)
 */

import type { MonthlyData, ExtraPaymentFrequency } from '../types'

/**
 * Convert annual interest rate to monthly rate using Canadian semi-annual compounding
 * Canadian mortgages compound semi-annually, not monthly
 */
export function convertToMonthlyRate(annualRate: number): number {
  // Convert annual rate to semi-annual, then to monthly
  // monthly_rate = (1 + annual_rate/2)^(1/6) - 1
  const semiAnnualRate = annualRate / 100 / 2
  return Math.pow(1 + semiAnnualRate, 1 / 6) - 1
}

/**
 * Calculate monthly payment for mortgage
 */
export function calculateMonthlyPayment(
  principal: number,
  monthlyRate: number,
  numberOfMonths: number
): number {
  if (monthlyRate === 0) {
    return principal / numberOfMonths
  }

  const factor = Math.pow(1 + monthlyRate, numberOfMonths)
  return principal * ((monthlyRate * factor) / (factor - 1))
}

/**
 * Calculate mortgage amortization with optional extra payments
 * Returns monthly breakdown
 */
export function calculateMortgageAmortization(
  initialBalance: number,
  annualInterestRate: number,
  yearsRemaining: number,
  monthsRemaining: number,
  regularMonthlyPayment: number,
  extraPayment: number = 0,
  extraPaymentFrequency: ExtraPaymentFrequency = 'monthly',
  horizonMonths: number
): MonthlyData[] {
  const monthlyRate = convertToMonthlyRate(annualInterestRate)
  const breakdown: MonthlyData[] = []

  let balance = initialBalance
  let totalInterestPaid = 0
  let totalPaid = 0

  for (let month = 0; month < horizonMonths && balance > 0; month++) {
    // Determine if extra payment applies this month
    let extraThisMonth = 0
    if (extraPayment > 0) {
      if (extraPaymentFrequency === 'monthly') {
        extraThisMonth = extraPayment
      } else if (extraPaymentFrequency === 'annual') {
        // Apply annual payment in month 12, 24, 36, etc. (at the end of each year)
        if ((month + 1) % 12 === 0) {
          extraThisMonth = extraPayment
        }
      } else if (extraPaymentFrequency === 'one-time') {
        // Apply one-time payment only in the first month
        if (month === 0) {
          extraThisMonth = extraPayment
        }
      }
    }

    const totalPayment = regularMonthlyPayment + extraThisMonth
    const interestPayment = balance * monthlyRate
    const principalPayment = Math.min(totalPayment - interestPayment, balance)
    balance -= principalPayment
    totalInterestPaid += interestPayment
    totalPaid += totalPayment

    breakdown.push({
      month: month + 1,
      mortgageBalance: Math.max(0, balance),
      investmentBalance: 0, // Will be calculated separately
      netWorth: 0, // Will be calculated in comparison
      totalPaid,
      interestPaid: totalInterestPaid,
    })

    // If balance is paid off, stop
    if (balance <= 0.01) {
      break
    }
  }

  return breakdown
}

/**
 * Calculate when mortgage will be paid off
 */
export function calculateMortgageFreeDate(
  initialBalance: number,
  annualInterestRate: number,
  regularMonthlyPayment: number,
  extraPayment: number = 0,
  extraPaymentFrequency: ExtraPaymentFrequency = 'monthly'
): Date | null {
  const monthlyRate = convertToMonthlyRate(annualInterestRate)
  const basePayment = regularMonthlyPayment

  // Check if base payment alone can pay off mortgage
  if (basePayment <= initialBalance * monthlyRate) {
    // Payment is too small, mortgage will never be paid off
    return null
  }

  let balance = initialBalance
  let months = 0
  const maxMonths = 50 * 12 // 50 years max

  while (balance > 0.01 && months < maxMonths) {
    // Determine if extra payment applies this month
    let extraThisMonth = 0
    if (extraPayment > 0) {
      if (extraPaymentFrequency === 'monthly') {
        extraThisMonth = extraPayment
      } else if (extraPaymentFrequency === 'annual') {
        if ((months + 1) % 12 === 0) {
          extraThisMonth = extraPayment
        }
      } else if (extraPaymentFrequency === 'one-time') {
        if (months === 0) {
          extraThisMonth = extraPayment
        }
      }
    }

    const totalPayment = basePayment + extraThisMonth
    const interestPayment = balance * monthlyRate
    const principalPayment = totalPayment - interestPayment
    balance -= principalPayment
    months++

    if (balance <= 0.01) {
      break
    }
  }

  if (months >= maxMonths) {
    return null
  }

  const date = new Date()
  date.setMonth(date.getMonth() + months)
  return date
}

