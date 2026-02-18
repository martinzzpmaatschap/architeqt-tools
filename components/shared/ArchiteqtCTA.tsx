import Link from 'next/link'
import { BRAND } from '@/lib/constants'

interface ArchiteqtCTAProps {
  variant?: 'default' | 'compact'
}

export default function ArchiteqtCTA({ variant = 'default' }: ArchiteqtCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-primary-turquoise-bg border border-primary-turquoise/30 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-700 mb-3">
          <strong>Wil je meer?</strong> Probeer {BRAND.name} voor volledig projectbeheer.
        </p>
        <Link
          href={BRAND.signupUrl}
          className="inline-block bg-primary-turquoise hover:bg-primary-turquoise-hover text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
        >
          Start gratis trial
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-primary-turquoise to-teal-600 rounded-xl p-8 text-white text-center">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-3">
          Wil je meer dan alleen tools?
        </h3>
        <p className="text-lg text-teal-50 mb-6">
          Met {BRAND.name} krijg je een volledig platform voor projectbeheer, tijdregistratie, 
          klantcommunicatie en meer. Speciaal gemaakt voor architecten.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={BRAND.signupUrl}
            className="bg-white text-primary-turquoise hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Probeer {BRAND.name} 14 dagen gratis
          </Link>
          <Link
            href={BRAND.mainSite}
            className="text-white hover:text-teal-100 font-medium underline"
          >
            Meer informatie →
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-teal-100">
          <span className="flex items-center gap-1">
            <span>✓</span> Geen creditcard nodig
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> 14 dagen gratis
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Opzeggen wanneer je wilt
          </span>
        </div>
      </div>
    </div>
  )
}
