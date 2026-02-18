import Link from 'next/link'

interface ToolCardProps {
  name: string
  description: string
  icon: string
  href: string
  features: readonly string[]
}

export default function ToolCard({ name, description, icon, href, features }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary-turquoise transition-all duration-200 p-6 h-full flex flex-col">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-turquoise transition-colors">
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 flex-grow">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-primary-turquoise">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="text-primary-turquoise font-medium text-sm group-hover:translate-x-1 transition-transform">
          Start nu →
        </div>
      </div>
    </Link>
  )
}
