'use client';

import { BRAND } from '@/lib/constants';

interface SaveUpsellBannerProps {
  toolName: string;
  message?: string;
}

export default function SaveUpsellBanner({ 
  toolName,
  message = 'Dit resultaat verdwijnt als je de pagina sluit'
}: SaveUpsellBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="text-3xl">💾</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">
            {message}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Wil je dit resultaat bewaren? Met een gratis {BRAND.name} account kun je 
            al je berekeningen opslaan en later terugvinden.
          </p>
          <a
            href={BRAND.toolsSignupUrl(toolName)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-architeqt text-white px-6 py-2 rounded-lg font-semibold hover:bg-architeqt/90 transition-colors"
          >
            Opslaan in account (gratis)
          </a>
        </div>
      </div>
    </div>
  );
}
