import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToolsNav from '@/components/layout/ToolsNav'
import ToolsFooter from '@/components/layout/ToolsFooter'
import { BRAND } from '@/lib/constants'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: `${BRAND.name} Tools Hub - Gratis architect tools`,
  description: 'Budget calculator, project planner en PDF naar Excel converter voor architecten. 100% gratis, geen account nodig.',
  keywords: ['architect', 'tools', 'budget calculator', 'project planner', 'PDF converter', 'gratis'],
  authors: [{ name: BRAND.name, url: BRAND.mainSite }],
  openGraph: {
    title: `${BRAND.name} Tools Hub`,
    description: 'Gratis tools voor architecten - Budget calculator, project planner en meer',
    url: 'https://tools.architeqt.tech',
    siteName: `${BRAND.name} Tools`,
    locale: 'nl_NL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm py-2 text-center">
          ✨ Probeer <a href={BRAND.mainSite} className="underline font-semibold">{BRAND.name}</a> 14 dagen gratis
        </div>

        <ToolsNav />

        <main className="flex-grow">
          {children}
        </main>

        <ToolsFooter />
      </body>
    </html>
  )
}
