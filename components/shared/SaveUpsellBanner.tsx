'use client'

import { useState } from 'react'
import { BRAND } from '@/lib/constants'
import LeadCaptureForm from './LeadCaptureForm'

interface SaveUpsellBannerProps {
  toolName: string
  onDownload: () => void
}

export default function SaveUpsellBanner({ toolName, onDownload }: SaveUpsellBannerProps) {
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  const handleSaveClick = () => {
    // Direct naar signup (met tool tracking)
    window.open(BRAND.toolsSignupUrl(toolName), '_blank')
  }

  return (
    <div className="bg-gradient-to-r from-primary-turquoise-bg to-blue-50 border-2 border-primary-turquoise rounded-xl p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">💾</div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Je berekening is klaar!
          </h3>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>
                <strong>Let op:</strong> je resultaat verdwijnt als je deze pagina sluit of herlaadt.
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={onDownload}
              className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>📥</span>
              <span>Download PDF</span>
              <span className="text-xs text-gray-500">(gratis)</span>
            </button>

            <button
              onClick={handleSaveClick}
              className="flex-1 sm:flex-none bg-primary-turquoise hover:bg-primary-turquoise-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>💾</span>
              <span>Opslaan in mijn account</span>
              <span className="text-xs opacity-90">(gratis account)</span>
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-900 mb-2">
              Met een account kun je ook:
            </p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-primary-turquoise">✓</span>
                Onbeperkt berekeningen opslaan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-turquoise">✓</span>
                Projecten vergelijken
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-turquoise">✓</span>
                14 dagen alle ArchiteQt features gratis
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Optional: Lead capture form (als user nog niet ingelogd is) */}
      {showLeadCapture && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <LeadCaptureForm toolUsed={toolName} />
        </div>
      )}
    </div>
  )
}
