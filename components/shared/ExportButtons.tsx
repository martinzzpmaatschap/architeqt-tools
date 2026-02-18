'use client'

import { useState } from 'react'

interface ExportButtonsProps {
  onExportExcel: () => Promise<void> | void
  onExportPDF: () => Promise<void> | void
  disabled?: boolean
}

export default function ExportButtons({ 
  onExportExcel, 
  onExportPDF, 
  disabled = false 
}: ExportButtonsProps) {
  const [loadingExcel, setLoadingExcel] = useState(false)
  const [loadingPDF, setLoadingPDF] = useState(false)

  const handleExportExcel = async () => {
    setLoadingExcel(true)
    try {
      await onExportExcel()
    } catch (error) {
      console.error('Excel export error:', error)
      alert('Er ging iets mis bij het exporteren naar Excel. Probeer het opnieuw.')
    } finally {
      setLoadingExcel(false)
    }
  }

  const handleExportPDF = async () => {
    setLoadingPDF(true)
    try {
      await onExportPDF()
    } catch (error) {
      console.error('PDF export error:', error)
      alert('Er ging iets mis bij het exporteren naar PDF. Probeer het opnieuw.')
    } finally {
      setLoadingPDF(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleExportExcel}
        disabled={disabled || loadingExcel}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        {loadingExcel ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Exporteren...</span>
          </>
        ) : (
          <>
            <span>📊</span>
            <span>Download als Excel</span>
          </>
        )}
      </button>

      <button
        onClick={handleExportPDF}
        disabled={disabled || loadingPDF}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        {loadingPDF ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Exporteren...</span>
          </>
        ) : (
          <>
            <span>📄</span>
            <span>Download als PDF</span>
          </>
        )}
      </button>
    </div>
  )
}
