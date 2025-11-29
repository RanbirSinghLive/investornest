/**
 * Core TypeScript types and interfaces for InvestOrNest calculator
 * All amounts in CAD currency
 */

export type ExtraPaymentFrequency = 'monthly' | 'annual' | 'one-time'

export interface CalculatorInputs {
  loanBalance: number // Current mortgage balance (CAD)
  currentHomeValue: number // Current home value (CAD)
  interestRate: number // Annual interest rate (%)
  yearsRemaining: number // Years left on mortgage
  monthsRemaining: number // Additional months left on mortgage (0-11)
  regularPayment: number // Monthly payment amount (CAD)
  extraPayment: number // Extra payment amount (CAD)
  extraPaymentFrequency: ExtraPaymentFrequency // Frequency of extra payment
  expectedReturn: number // Expected annual investment return (%)
  showRealTerms: boolean // Toggle to show inflation-adjusted (real) terms
  inflationRate: number // Annual inflation rate (%)
  homeAppreciationRate: number // Expected annual home appreciation rate (%)
}

export interface MonthlyData {
  month: number
  mortgageBalance: number
  investmentBalance: number
  netWorth: number
  totalPaid: number
  interestPaid: number
}

export interface StrategyResult {
  netWorth: number
  mortgageBalance: number
  investmentBalance: number
  mortgageFreeDate: Date | null
  totalInterestPaid: number
  monthlyBreakdown: MonthlyData[]
  totalPaid: number
}

export interface CalculationResults {
  prepayStrategy: StrategyResult
  investStrategy: StrategyResult
  comparison: {
    netWorthDifference: number
    winner: 'prepay' | 'invest' | 'tie'
    breakEvenReturn: number // Return % where strategies are equal
    narrative: string // Plain-English summary
  }
}

