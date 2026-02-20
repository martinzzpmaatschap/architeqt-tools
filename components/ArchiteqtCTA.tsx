'use client';

import { BRAND } from '@/lib/constants';

export default function ArchiteqtCTA() {
  return (
    <div className="bg-gradient-to-br from-architeqt to-architeqt/80 text-white rounded-2xl p-8 md:p-10 shadow-xl">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-4xl mb-4">🏢</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Meer dan alleen tools?
        </h3>
        <p className="text-lg text-white/90 mb-6">
          Met {BRAND.name} krijg je een compleet platform voor projectbeheer, tijdregistratie, 
          klantcommunicatie, facturen en meer. Speciaal gebouwd voor architecten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BRAND.mainSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-architeqt px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ontdek {BRAND.name}
          </a>
          <a
            href={BRAND.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-architeqt transition-colors"
          >
            Start 14 dagen gratis
          </a>
        </div>
        <p className="text-sm text-white/70 mt-4">
          Geen creditcard nodig • Opzeggen wanneer je wilt
        </p>
      </div>
    </div>
  );
}
