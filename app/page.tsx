import { TOOLS, BRAND } from '@/lib/constants'
import ToolCard from '@/components/shared/ToolCard'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gratis Tools voor Architecten
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Budget calculator, project planner en PDF converter. Professioneel, snel en 100% gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#tools"
              className="bg-white text-teal-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Bekijk tools
            </Link>
            <Link
              href={BRAND.signupUrl}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              Maak gratis account
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kies een tool
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool) => (
              <ToolCard
                key={tool.slug}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
                features={tool.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Waarom deze tools?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Privacy</h3>
              <p className="text-gray-600">
                Alle berekeningen gebeuren lokaal in je browser. Geen data naar servers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Direct resultaat</h3>
              <p className="text-gray-600">
                Geen wachttijden. Vul in, zie resultaat, exporteer direct naar Excel of PDF.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Voor architecten</h3>
              <p className="text-gray-600">
                Specifiek voor Nederlandse architecten met realistische prijzen en tijdlijnen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-turquoise-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Wil je meer dan alleen tools?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Met {BRAND.name} krijg je een volledig platform voor projectbeheer, tijdregistratie, klantcommunicatie en meer.
          </p>
          <Link
            href={BRAND.signupUrl}
            className="inline-block bg-primary-turquoise hover:bg-primary-turquoise-hover text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Probeer {BRAND.name} 14 dagen gratis
          </Link>
        </div>
      </section>
    </div>
  )
}
