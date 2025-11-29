/**
 * Sensitivity analysis calculations
 * Shows how break-even point shifts with input variations
 */

import type { CalculatorInputs, CalculationResults } from '../types'
import { calculateComparison } from './comparison'

export interface SensitivityScenario {
  label: string
  description: string
  variation: Partial<CalculatorInputs>
  breakEvenReturn: number
  netWorthDifference: number
  winner: 'prepay' | 'invest' | 'tie'
}

export interface SensitivityAnalysis {
  scenarios: SensitivityScenario[]
  baseline: {
    breakEvenReturn: number
    netWorthDifference: number
    winner: 'prepay' | 'invest' | 'tie'
  }
}

/**
 * Calculate break-even return for a given input variation
 */
function calculateBreakEvenForVariation(
  baseInputs: CalculatorInputs,
  variation: Partial<CalculatorInputs>
): number {
  const modifiedInputs = { ...baseInputs, ...variation }
  const results = calculateComparison(modifiedInputs)
  return results.comparison.breakEvenReturn
}

/**
 * Generate sensitivity analysis scenarios
 */
export function generateSensitivityAnalysis(
  baseInputs: CalculatorInputs
): SensitivityAnalysis {
  console.log('📊 Generating sensitivity analysis...')
  const baselineResults = calculateComparison(baseInputs)
  const baseline = {
    breakEvenReturn: baselineResults.comparison.breakEvenReturn,
    netWorthDifference: baselineResults.comparison.netWorthDifference,
    winner: baselineResults.comparison.winner,
  }

  const scenarios: SensitivityScenario[] = []

  // Investment return variations (±1%, ±2%)
  const returnVariations = [-2, -1, 1, 2]
  for (const variation of returnVariations) {
    const newReturn = baseInputs.expectedReturn + variation
    if (newReturn >= 0 && newReturn <= 30) {
      const modifiedInputs = { ...baseInputs, expectedReturn: newReturn }
      const results = calculateComparison(modifiedInputs)
      scenarios.push({
        label: `Return ${variation > 0 ? '+' : ''}${variation}%`,
        description: `If investment return is ${variation > 0 ? '+' : ''}${variation}% (${newReturn.toFixed(1)}% total)`,
        variation: { expectedReturn: newReturn },
        breakEvenReturn: results.comparison.breakEvenReturn,
        netWorthDifference: results.comparison.netWorthDifference,
        winner: results.comparison.winner,
      })
    }
  }


  console.log(`✅ Generated ${scenarios.length} sensitivity scenarios`)

  return {
    scenarios,
    baseline,
  }
}

