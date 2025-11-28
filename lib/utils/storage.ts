/**
 * localStorage helpers for saving user preferences
 * No PII stored, only numeric preferences
 */

const STORAGE_KEY = 'investornest_preferences'

export interface StoredPreferences {
  interestRate?: number
  expectedReturn?: number
  comparisonHorizon?: number
}

/**
 * Load preferences from localStorage
 */
export function loadPreferences(): StoredPreferences {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as StoredPreferences
    }
  } catch (error) {
    console.error('Error loading preferences:', error)
  }

  return {}
}

/**
 * Save preferences to localStorage
 */
export function savePreferences(preferences: StoredPreferences): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch (error) {
    console.error('Error saving preferences:', error)
  }
}

/**
 * Clear preferences from localStorage
 */
export function clearPreferences(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing preferences:', error)
  }
}

