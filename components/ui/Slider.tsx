import React from 'react'

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  value: number
  min: number
  max: number
  step?: number
  formatValue?: (value: number) => string
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  className = '',
  ...props
}: SliderProps) {
  const displayValue = formatValue ? formatValue(value) : value.toString()

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <span className="text-sm font-semibold text-primary-600">{displayValue}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        {...props}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  )
}

