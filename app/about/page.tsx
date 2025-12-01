import React from 'react'
import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'About & Assumptions',
  description:
    'Learn about InvestOrNest, how it works, key assumptions, and privacy policy. Free Canadian mortgage vs investment calculator with transparent calculations.',
  openGraph: {
    title: 'About InvestOrNest - Mortgage vs Investment Calculator',
    description:
      'Learn about InvestOrNest, how it works, key assumptions, and privacy policy.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About InvestOrNest</h1>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is InvestOrNest?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              InvestOrNest is a free, privacy-first calculator that helps Canadian homeowners
              answer a simple but important question: Should I pay off my mortgage faster, or invest
              the extra money?
            </p>
            <p className="text-gray-700 leading-relaxed">
              All calculations are performed locally on your device. We don't collect, store, or
              transmit any personal information.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Assumptions</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  <strong>Canadian Mortgage Compounding:</strong> Uses semi-annual compounding
                  (Canadian standard), not monthly compounding.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  <strong>Investment Returns:</strong> Assumes monthly contributions with monthly
                  compounding. Returns are pre-tax.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  <strong>Constant Rates:</strong> Interest rates and investment returns are
                  assumed to remain constant over the comparison period.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  <strong>No Tax Considerations:</strong> Calculations do not account for tax
                  implications (RRSP, TFSA, capital gains, etc.).
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  <strong>No Inflation:</strong> All amounts are in nominal dollars (not adjusted for
                  inflation).
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  <strong>Home Value:</strong> Assumes home value equals initial loan balance (no
                  appreciation or depreciation).
                </span>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prepay Strategy</h3>
                <p>
                  Your extra monthly payment goes directly toward reducing your mortgage principal.
                  This reduces the total interest paid and shortens your mortgage term.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Invest Strategy</h3>
                <p>
                  Your extra monthly payment is invested instead, earning returns at your expected
                  rate. Your mortgage continues on its regular schedule.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Net Worth Calculation</h3>
                <p>
                  Net Worth = (Home Value - Remaining Mortgage Balance) + Investment Balance
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy & Security</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>All calculations happen in your browser. No data is sent to servers.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>No cookies (except optional analytics).</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>PIPEDA compliant (Canadian privacy law).</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>
                  Optional localStorage saves only numeric preferences (interest rate, return, etc.)
                  - no personal information.
                </span>
              </li>
            </ul>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>This tool is for educational purposes only and does not constitute financial
              advice.</strong> Your actual results will depend on many factors including market
              conditions, tax situations, and personal circumstances. Please consult with a
              qualified financial advisor before making significant financial decisions.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

