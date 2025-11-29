/**
 * Input validation functions
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validate loan balance
 */
export function validateLoanBalance(value: number): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Loan balance must be greater than 0' }
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Loan balance is too large' }
  }
  return { isValid: true }
}

/**
 * Validate interest rate
 */
export function validateInterestRate(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Interest rate cannot be negative' }
  }
  if (value > 20) {
    return { isValid: false, error: 'Interest rate cannot exceed 20%' }
  }
  return { isValid: true }
}

/**
 * Validate years remaining
 */
export function validateYearsRemaining(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Years remaining cannot be negative' }
  }
  if (value > 50) {
    return { isValid: false, error: 'Years remaining cannot exceed 50' }
  }
  return { isValid: true }
}

/**
 * Validate months remaining
 */
export function validateMonthsRemaining(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Months remaining cannot be negative' }
  }
  if (value > 11) {
    return { isValid: false, error: 'Months remaining cannot exceed 11' }
  }
  return { isValid: true }
}

/**
 * Validate payment amount
 */
export function validatePayment(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Payment cannot be negative' }
  }
  if (value > 100000) {
    return { isValid: false, error: 'Payment amount is too large' }
  }
  return { isValid: true }
}

/**
 * Validate expected return
 */
export function validateExpectedReturn(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Expected return cannot be negative' }
  }
  if (value > 30) {
    return { isValid: false, error: 'Expected return cannot exceed 30%' }
  }
  return { isValid: true }
}

/**
 * Validate inflation rate
 */
export function validateInflationRate(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inflation rate cannot be negative' }
  }
  if (value > 10) {
    return { isValid: false, error: 'Inflation rate cannot exceed 10%' }
  }
  return { isValid: true }
}

/**
 * Validate current home value
 */
export function validateCurrentHomeValue(value: number): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Current home value must be greater than 0' }
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Current home value is too large' }
  }
  return { isValid: true }
}

/**
 * Validate home appreciation rate
 */
export function validateHomeAppreciationRate(value: number): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Home appreciation rate cannot be negative' }
  }
  if (value > 20) {
    return { isValid: false, error: 'Home appreciation rate cannot exceed 20%' }
  }
  return { isValid: true }
}

/**
 * Validate all calculator inputs
 */
export function validateInputs(inputs: {
  loanBalance: number
  currentHomeValue: number
  interestRate: number
  yearsRemaining: number
  monthsRemaining: number
  regularPayment: number
  extraPayment: number
  expectedReturn: number
  inflationRate: number
  homeAppreciationRate: number
}): ValidationResult {
  const validations = [
    validateLoanBalance(inputs.loanBalance),
    validateCurrentHomeValue(inputs.currentHomeValue),
    validateInterestRate(inputs.interestRate),
    validateYearsRemaining(inputs.yearsRemaining),
    validateMonthsRemaining(inputs.monthsRemaining),
    validatePayment(inputs.regularPayment),
    validatePayment(inputs.extraPayment),
    validateExpectedReturn(inputs.expectedReturn),
    validateInflationRate(inputs.inflationRate),
    validateHomeAppreciationRate(inputs.homeAppreciationRate),
  ]

  for (const validation of validations) {
    if (!validation.isValid) {
      return validation
    }
  }

  return { isValid: true }
}

