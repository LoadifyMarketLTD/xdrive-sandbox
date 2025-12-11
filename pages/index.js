import { useRouter } from 'next/router'
import Head from 'next/head'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Home() {
  const router = useRouter()
  const { locale } = router
  
  const translations = {
    en: {
      title: 'Welcome to xdrive-sandbox',
      description: 'A logistics marketplace demo built with Next.js and Tailwind CSS',
      features: 'Features',
      featuresList: [
        'Next.js 13 with React 18',
        'Tailwind CSS for styling',
        'i18n support (EN, FR, DE, RO)',
        'API routes',
        'CI/CD with GitHub Actions'
      ],
      getStarted: 'Get Started',
      documentation: 'Check out the README.md for setup instructions',
      aboutLink: 'About Page'
    },
    fr: {
      title: 'Bienvenue sur xdrive-sandbox',
      description: 'Une démo de marketplace logistique construite avec Next.js et Tailwind CSS',
      features: 'Fonctionnalités',
      featuresList: [
        'Next.js 13 avec React 18',
        'Tailwind CSS pour le style',
        'Support i18n (EN, FR, DE, RO)',
        'Routes API',
        'CI/CD avec GitHub Actions'
      ],
      getStarted: 'Commencer',
      documentation: 'Consultez le README.md pour les instructions de configuration',
      aboutLink: 'Page À propos'
    },
    de: {
      title: 'Willkommen bei xdrive-sandbox',
      description: 'Eine Logistik-Marktplatz-Demo mit Next.js und Tailwind CSS',
      features: 'Funktionen',
      featuresList: [
        'Next.js 13 mit React 18',
        'Tailwind CSS für das Styling',
        'i18n-Unterstützung (EN, FR, DE, RO)',
        'API-Routen',
        'CI/CD mit GitHub Actions'
      ],
      getStarted: 'Loslegen',
      documentation: 'Siehe README.md für Einrichtungsanweisungen',
      aboutLink: 'Über-Seite'
    },
    ro: {
      title: 'Bun venit la xdrive-sandbox',
      description: 'O demonstrație de marketplace logistic construită cu Next.js și Tailwind CSS',
      features: 'Caracteristici',
      featuresList: [
        'Next.js 13 cu React 18',
        'Tailwind CSS pentru stilizare',
        'Suport i18n (EN, FR, DE, RO)',
        'Rute API',
        'CI/CD cu GitHub Actions'
      ],
      getStarted: 'Începe',
      documentation: 'Consultă README.md pentru instrucțiuni de configurare',
      aboutLink: 'Pagina Despre'
    }
  }

  const t = translations[locale] || translations.en

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LanguageSwitcher />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-6 text-gray-900">
              {t.title}
            </h1>
            
            <p className="text-xl text-center mb-12 text-gray-700">
              {t.description}
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                {t.features}
              </h2>
              <ul className="space-y-3">
                {t.featuresList.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {t.getStarted}
              </h2>
              <p className="text-gray-700 mb-4">
                {t.documentation}
              </p>
              <div className="flex gap-4">
                <a 
                  href="/about" 
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {t.aboutLink}
                </a>
                <a 
                  href="/api/hello" 
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Test API
                </a>
              </div>
            </div>

            <div className="text-center text-gray-600">
              <p>Current locale: <span className="font-semibold">{locale}</span></p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
