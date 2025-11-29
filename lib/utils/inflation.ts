/**
 * Inflation adjustment utilities
 * Converts nominal (current dollar) values to real (inflation-adjusted) values
 */

/**
 * Calculate inflation adjustment factor for a given number of months
 * @param inflationRate Annual inflation rate as percentage (e.g., 2 for 2%)
 * @param months Number of months from present
 * @returns Adjustment factor to multiply nominal value by to get real value
 */
export function getInflationAdjustmentFactor(
  inflationRate: number,
  months: number
): number {
  if (inflationRate === 0) {
    return 1
  }
  // Convert annual rate to monthly, then calculate adjustment
  // Real value = Nominal value / (1 + inflation_rate)^(months/12)
  const monthlyInflationRate = inflationRate / 100 / 12
  return 1 / Math.pow(1 + monthlyInflationRate, months)
}

/**
 * Adjust a nominal value to real (inflation-adjusted) terms
 * @param nominalValue Value in current dollars
 * @param inflationRate Annual inflation rate as percentage
 * @param months Number of months from present
 * @returns Value adjusted for inflation (in today's dollars)
 */
export function adjustForInflation(
  nominalValue: number,
  inflationRate: number,
  months: number
): number {
  const factor = getInflationAdjustmentFactor(inflationRate, months)
  return nominalValue * factor
}

/**
 * Adjust an array of monthly values for inflation
 * @param monthlyValues Array of nominal values (one per month)
 * @param inflationRate Annual inflation rate as percentage
 * @returns Array of inflation-adjusted values
 */
export function adjustMonthlyValuesForInflation(
  monthlyValues: number[],
  inflationRate: number
): number[] {
  return monthlyValues.map((value, index) =>
    adjustForInflation(value, inflationRate, index + 1)
  )
}

