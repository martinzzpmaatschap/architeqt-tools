import Link from 'next/link'
import { BRAND, TOOLS } from '@/lib/constants'

export default function ToolsFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="font-semibold text-gray-900 mb-2">{BRAND.name}</div>
            <p className="text-sm text-gray-600 mb-4">{BRAND.tagline}</p>
            <Link
              href={BRAND.mainSite}
              className="text-sm text-primary-turquoise hover:text-primary-turquoise-hover font-medium"
            >
              Ga naar ArchiteQt →
            </Link>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Gratis Tools</h3>
            <ul className="space-y-2">
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
                  >
                    {tool.icon} {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ArchiteQt */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">ArchiteQt Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={BRAND.signupUrl}
                  className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
                >
                  Gratis aanmelden
                </Link>
              </li>
              <li>
                <Link
                  href={`${BRAND.mainSite}/pricing`}
                  className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
                >
                  Prijzen
                </Link>
              </li>
              <li>
                <Link
                  href={`${BRAND.mainSite}/features`}
                  className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
                >
                  Functies
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Juridisch</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${BRAND.mainSite}/privacy`}
                  className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href={`${BRAND.mainSite}/terms`}
                  className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
                >
                  Voorwaarden
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © {currentYear} {BRAND.name}. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  )
}
