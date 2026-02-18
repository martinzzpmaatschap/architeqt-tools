export const TOOLS = [
  {
    slug: 'budget-calculator',
    name: 'Budget Calculator',
    description: 'Bereken direct je projectkosten op basis van type, oppervlakte en regio',
    icon: '💰',
    href: '/budget-calculator',
    features: ['9 project types', 'NL regio prijzen', 'Excel + PDF export'],
  },
  {
    slug: 'project-planner',
    name: 'Project Planner',
    description: 'Realistische timeline met vergunning en seizoen impact',
    icon: '📅',
    href: '/project-planner',
    features: ['Vergunning timing', 'Seizoen impact', 'Risk analysis'],
  },
  {
    slug: 'pdf-to-excel',
    name: 'PDF naar Excel',
    description: 'Converteer PDF tabellen naar bewerkbare Excel bestanden',
    icon: '📄',
    href: '/pdf-to-excel',
    features: ['100% privacy', 'Automatische detectie', 'Gratis onbeperkt'],
  },
] as const;

export const BRAND = {
  name: 'ArchiteQt',
  tagline: 'Time creates space for vision',
  mainSite: 'https://architeqt.tech',
  signupUrl: 'https://architeqt.tech/auth/signup',
  toolsSignupUrl: (tool: string) => 
    `https://architeqt.tech/auth/signup?from=tools&tool=${tool}`,
} as const;
