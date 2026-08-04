type SiteLink = Readonly<{ label: string; href: string }>;
type ServiceMode = Readonly<{ title: string; description: string; items: readonly string[]; cta: string }>;
type Finding = Readonly<{ title: string; area: string; severity: 'Crítico' | 'Alto' | 'Medio' | 'Bajo'; impact: string; effort: string; recommendation: string }>;
type TechnicalProfile = Readonly<{
  role: string;
  introduction: string;
  perspective: string;
  highlights: readonly Readonly<{ value: string; label: string }>[];
  expertise: readonly string[];
  credential: Readonly<{ name: string; issuer: string; validity: string }>;
  linkedinCta: string;
}>;
type FaqItem = Readonly<{ question: string; answer: string }>;
type AuditConfig = Readonly<{
  hero: Readonly<{ title: string; subtitle: string; secondaryCta: string; reassurance: string }>;
  idealClientScenarios: readonly string[];
  scope: readonly string[];
  duration: string;
  deliverables: readonly string[];
  scorecard: readonly Readonly<{ label: string; score: string; status: 'Alto' | 'Medio' | 'Bajo' }>[];
  findings: readonly Finding[];
  matrix: readonly Readonly<{ quadrant: string; initiative: string }>[];
  roadmap: readonly Readonly<{ period: string; items: readonly string[] }>[];
  process: readonly Readonly<{ title: string; description: string; outcome: string }>[];
}>;
type SiteConfig = Readonly<{
  brandName: string;
  founderName: string;
  domain: string;
  email: string;
  location: string;
  linkedinUrl: string;
  bookingUrl: string;
  bookingSubject: string;
  primaryCta: Readonly<{ label: string }>;
  navigation: readonly SiteLink[];
  audit: AuditConfig;
  serviceModes: readonly ServiceMode[];
  expectedOutcomes: readonly string[];
  technicalProfile: TechnicalProfile;
  faqs: readonly FaqItem[];
  footer: Readonly<{ navigation: readonly SiteLink[]; legal: readonly SiteLink[] }>;
  seo: Readonly<{ title: string; description: string }>;
}>;

interface Window {
  SITE_CONFIG: SiteConfig;
}
