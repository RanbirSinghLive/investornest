/**
 * Net worth comparison calculations
 * Compares prepay vs invest strategies
 */

import type { CalculatorInputs, CalculationResults, MonthlyData, StrategyResult } from '../types'
import { calculateMortgageAmortization } from './mortgage'
import { calculateInvestmentBreakdown } from './investment'
import { calculateMortgageFreeDate } from './mortgage'

/**
 * Calculate net worth for a strategy
 * Net Worth = Home Equity + Investment Balance - Remaining Mortgage Balance
 * For simplicity, we assume home value = initial loan amount (no appreciation)
 */
function calculateNetWorth(
  homeValue: number,
  mortgageBalance: number,
  investmentBalance: number
): number {
  const homeEquity = homeValue - mortgageBalance
  return homeEquity + investmentBalance
}

/**
 * Calculate prepay strategy results
 */
function calculatePrepayStrategy(
  inputs: CalculatorInputs,
  horizonMonths: number
): StrategyResult {
  const mortgageBreakdown = calculateMortgageAmortization(
    inputs.loanBalance,
    inputs.interestRate,
    inputs.yearsRemaining,
    inputs.monthsRemaining,
    inputs.regularPayment,
    inputs.extraPayment,
    inputs.extraPaymentFrequency,
    horizonMonths
  )

  // In prepay strategy, extra payment goes to mortgage, so no investment
  const investmentBreakdown = new Array(Math.max(horizonMonths, mortgageBreakdown.length)).fill(0)

  const monthlyData: MonthlyData[] = mortgageBreakdown.map((mortgage, index) => {
    const investment = investmentBreakdown[index] || 0
    const homeValue = inputs.loanBalance // Assume home value = initial loan
    const netWorth = calculateNetWorth(homeValue, mortgage.mortgageBalance, investment)

    return {
      ...mortgage,
      investmentBalance: investment,
      netWorth,
    }
  })

  const finalData = monthlyData[monthlyData.length - 1] || monthlyData[0]
  const mortgageFreeDate = calculateMortgageFreeDate(
    inputs.loanBalance,
    inputs.interestRate,
    inputs.regularPayment,
    inputs.extraPayment,
    inputs.extraPaymentFrequency
  )

  return {
    netWorth: finalData.netWorth,
    mortgageBalance: finalData.mortgageBalance,
    investmentBalance: finalData.investmentBalance,
    mortgageFreeDate,
    totalInterestPaid: finalData.interestPaid,
    monthlyBreakdown: monthlyData,
    totalPaid: finalData.totalPaid,
  }
}

/**
 * Calculate invest strategy results
 */
function calculateInvestStrategy(
  inputs: CalculatorInputs,
  horizonMonths: number
): StrategyResult {
  const mortgageBreakdown = calculateMortgageAmortization(
    inputs.loanBalance,
    inputs.interestRate,
    inputs.yearsRemaining,
    inputs.monthsRemaining,
    inputs.regularPayment,
    0, // No extra payment in invest strategy
    'monthly', // Not used since extraPayment is 0
    horizonMonths
  )

  // In invest strategy, extra payment goes to investment
  const investmentBreakdown = calculateInvestmentBreakdown(
    inputs.extraPayment,
    inputs.expectedReturn,
    Math.max(horizonMonths, mortgageBreakdown.length),
    inputs.extraPaymentFrequency,
    0
  )

  // Ensure both arrays have the same length
  const maxLength = Math.max(mortgageBreakdown.length, investmentBreakdown.length)
  const monthlyData: MonthlyData[] = []

  for (let i = 0; i < maxLength; i++) {
    const mortgage = mortgageBreakdown[i] || {
      month: i + 1,
      mortgageBalance: mortgageBreakdown[mortgageBreakdown.length - 1]?.mortgageBalance || 0,
      investmentBalance: 0,
      netWorth: 0,
      totalPaid: mortgageBreakdown[mortgageBreakdown.length - 1]?.totalPaid || 0,
      interestPaid: mortgageBreakdown[mortgageBreakdown.length - 1]?.interestPaid || 0,
    }
    const investment = investmentBreakdown[i] || investmentBreakdown[investmentBreakdown.length - 1] || 0
    const homeValue = inputs.loanBalance // Assume home value = initial loan
    const netWorth = calculateNetWorth(homeValue, mortgage.mortgageBalance, investment)

    monthlyData.push({
      ...mortgage,
      investmentBalance: investment,
      netWorth,
    })
  }

  const finalData = monthlyData[monthlyData.length - 1] || monthlyData[0]
  const mortgageFreeDate = calculateMortgageFreeDate(
    inputs.loanBalance,
    inputs.interestRate,
    inputs.regularPayment,
    0, // No extra payment
    'monthly' // Not used since extraPayment is 0
  )

  return {
    netWorth: finalData.netWorth,
    mortgageBalance: finalData.mortgageBalance,
    investmentBalance: finalData.investmentBalance,
    mortgageFreeDate,
    totalInterestPaid: finalData.interestPaid,
    monthlyBreakdown: monthlyData,
    totalPaid: finalData.totalPaid,
  }
}

/**
 * Generate plain-English narrative
 */
function generateNarrative(
  prepay: StrategyResult,
  invest: StrategyResult,
  inputs: CalculatorInputs
): string {
  const difference = invest.netWorth - prepay.netWorth
  const absDifference = Math.abs(difference)

  if (Math.abs(difference) < 1000) {
    return `Both strategies yield similar results. After ${inputs.comparisonHorizon} years, the difference in net worth is approximately ${Math.abs(difference) < 100 ? 'negligible' : `$${absDifference.toLocaleString('en-CA')}`}.`
  }

  const winner = difference > 0 ? 'investing' : 'prepaying'
  const prepayYears = prepay.mortgageFreeDate
    ? Math.ceil(
        (prepay.mortgageFreeDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365)
      )
    : null
  const investYears = invest.mortgageFreeDate
    ? Math.ceil(
        (invest.mortgageFreeDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365)
      )
    : null

  let narrative = `After ${inputs.comparisonHorizon} years, ${winner} your extra payment results in a net worth that is $${absDifference.toLocaleString('en-CA')} higher.`

  if (prepayYears && investYears && prepayYears < investYears) {
    narrative += ` However, prepaying your mortgage would make you mortgage-free ${investYears - prepayYears} years earlier.`
  }

  return narrative
}

/**
 * Calculate break-even return (where both strategies are equal)
 * Uses binary search
 */
function calculateBreakEvenReturn(
  inputs: CalculatorInputs,
  horizonMonths: number
): number {
  // Binary search for break-even return
  let low = 0
  let high = 30 // Max 30% return
  let tolerance = 0.01 // 0.01% tolerance
  let bestReturn = inputs.expectedReturn

  for (let i = 0; i < 50; i++) {
    const testReturn = (low + high) / 2
    const testInputs = { ...inputs, expectedReturn: testReturn }

    const prepay = calculatePrepayStrategy(testInputs, horizonMonths)
    const invest = calculateInvestStrategy(testInputs, horizonMonths)
    const difference = invest.netWorth - prepay.netWorth

    if (Math.abs(difference) < 100) {
      // Close enough
      bestReturn = testReturn
      break
    }

    if (difference > 0) {
      // Invest wins, need lower return
      high = testReturn
    } else {
      // Prepay wins, need higher return
      low = testReturn
    }

    bestReturn = testReturn
  }

  return bestReturn
}

/**
 * Main comparison function
 */
export function calculateComparison(inputs: CalculatorInputs): CalculationResults {
  console.log('🔄 Starting calculation with inputs:', inputs)
  const totalMonthsRemaining = inputs.yearsRemaining * 12 + inputs.monthsRemaining
  console.log(
    `📅 Mortgage remaining: ${totalMonthsRemaining} months (${inputs.yearsRemaining} years, ${inputs.monthsRemaining} months)`
  )
  console.log(`💰 Extra payment: ${inputs.extraPayment} CAD (${inputs.extraPaymentFrequency})`)
  const horizonMonths = Math.floor(inputs.comparisonHorizon * 12)
  console.log(`📅 Comparison horizon: ${horizonMonths} months (${inputs.comparisonHorizon} years)`)

  const prepayStrategy = calculatePrepayStrategy(inputs, horizonMonths)
  console.log('✅ Prepay strategy calculated:', {
    netWorth: prepayStrategy.netWorth,
    mortgageFreeDate: prepayStrategy.mortgageFreeDate,
  })

  const investStrategy = calculateInvestStrategy(inputs, horizonMonths)
  console.log('✅ Invest strategy calculated:', {
    netWorth: investStrategy.netWorth,
    mortgageFreeDate: investStrategy.mortgageFreeDate,
  })

  const netWorthDifference = investStrategy.netWorth - prepayStrategy.netWorth
  const winner: 'prepay' | 'invest' | 'tie' =
    Math.abs(netWorthDifference) < 1000
      ? 'tie'
      : netWorthDifference > 0
        ? 'invest'
        : 'prepay'

  const breakEvenReturn = calculateBreakEvenReturn(inputs, horizonMonths)
  console.log(`💰 Break-even return: ${breakEvenReturn.toFixed(2)}%`)

  const narrative = generateNarrative(prepayStrategy, investStrategy, inputs)
  console.log('📝 Narrative generated:', narrative.substring(0, 100) + '...')

  const result = {
    prepayStrategy,
    investStrategy,
    comparison: {
      netWorthDifference,
      winner,
      breakEvenReturn,
      narrative,
    },
  }

  console.log('🎯 Final comparison result:', {
    winner: result.comparison.winner,
    netWorthDifference: result.comparison.netWorthDifference,
  })

  return result
}

