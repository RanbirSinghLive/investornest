/**
 * Core TypeScript types and interfaces for InvestOrNest calculator
 * All amounts in CAD currency
 */

export type ExtraPaymentFrequency = 'monthly' | 'annual' | 'one-time'
export type InvestmentAccountType = 'RRSP' | 'FHSA' | 'TFSA' | 'RESP' | 'non-registered'
export type CanadianProvince =
  | 'AB'
  | 'BC'
  | 'MB'
  | 'NB'
  | 'NL'
  | 'NS'
  | 'NT'
  | 'NU'
  | 'ON'
  | 'PE'
  | 'QC'
  | 'SK'
  | 'YT'

export interface CalculatorInputs {
  loanBalance: number // Current mortgage balance (CAD)
  interestRate: number // Annual interest rate (%)
  yearsRemaining: number // Years left on mortgage
  monthsRemaining: number // Additional months left on mortgage (0-11)
  regularPayment: number // Monthly payment amount (CAD)
  extraPayment: number // Extra payment amount (CAD)
  extraPaymentFrequency: ExtraPaymentFrequency // Frequency of extra payment
  expectedReturn: number // Expected annual investment return (%, gross before tax)
  investmentAccountType: InvestmentAccountType // Account type for tax calculation
  province: CanadianProvince // Province for provincial tax rate
  grossIncome: number // Gross annual income (CAD) for tax bracket calculation
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

