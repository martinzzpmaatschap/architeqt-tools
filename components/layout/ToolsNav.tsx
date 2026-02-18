import Link from 'next/link'
import { BRAND, TOOLS } from '@/lib/constants'

export default function ToolsNav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary-turquoise rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <div className="font-semibold text-gray-900">{BRAND.name}</div>
              <div className="text-xs text-gray-500">Tools Hub</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors"
              >
                {tool.icon} {tool.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={BRAND.signupUrl}
            className="bg-primary-turquoise hover:bg-primary-turquoise-hover text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm"
          >
            Probeer ArchiteQt
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex gap-4 pb-4 overflow-x-auto">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="text-sm text-gray-600 hover:text-primary-turquoise transition-colors whitespace-nowrap"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
