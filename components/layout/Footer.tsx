import React from 'react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">InvestOrNest</h3>
            <p className="text-sm text-gray-600">
              Helping Canadian homeowners make informed financial decisions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Disclaimer</h4>
            <p className="text-xs text-gray-600">
              This is an educational tool only and does not constitute financial advice. All
              calculations are performed locally on your device. No personal information is
              collected or stored.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Privacy</h4>
            <p className="text-xs text-gray-600">
              This tool is PIPEDA compliant. All data stays on your device. We use privacy-friendly
              analytics (no cookies, no tracking).
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} InvestOrNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

