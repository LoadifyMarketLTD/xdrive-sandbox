import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function About() {
  const router = useRouter()
  const { locale } = router
  
  const translations = {
    en: {
      title: 'About xdrive-sandbox',
      heading: 'About This Project',
      description: 'xdrive-sandbox is a demonstration project for a logistics marketplace application. It showcases modern web development practices using Next.js, React, and Tailwind CSS.',
      purpose: 'Purpose',
      purposeText: 'This sandbox environment is designed to test and demonstrate key features including internationalization, API integration, and responsive design patterns.',
      technologies: 'Technologies Used',
      techList: [
        'Next.js 13 - React framework with server-side rendering',
        'React 18 - Modern UI library',
        'Tailwind CSS - Utility-first CSS framework',
        'i18n - Internationalization support',
        'GitHub Actions - Continuous integration'
      ],
      backHome: 'Back to Home'
    },
    fr: {
      title: 'À propos de xdrive-sandbox',
      heading: 'À propos de ce projet',
      description: 'xdrive-sandbox est un projet de démonstration pour une application de marketplace logistique. Il présente les pratiques modernes de développement web utilisant Next.js, React et Tailwind CSS.',
      purpose: 'Objectif',
      purposeText: 'Cet environnement sandbox est conçu pour tester et démontrer les fonctionnalités clés, notamment l\'internationalisation, l\'intégration d\'API et les modèles de conception réactifs.',
      technologies: 'Technologies utilisées',
      techList: [
        'Next.js 13 - Framework React avec rendu côté serveur',
        'React 18 - Bibliothèque UI moderne',
        'Tailwind CSS - Framework CSS utilitaire',
        'i18n - Support d\'internationalisation',
        'GitHub Actions - Intégration continue'
      ],
      backHome: 'Retour à l\'accueil'
    },
    de: {
      title: 'Über xdrive-sandbox',
      heading: 'Über dieses Projekt',
      description: 'xdrive-sandbox ist ein Demonstrationsprojekt für eine Logistik-Marktplatz-Anwendung. Es zeigt moderne Webentwicklungspraktiken mit Next.js, React und Tailwind CSS.',
      purpose: 'Zweck',
      purposeText: 'Diese Sandbox-Umgebung dient zum Testen und Demonstrieren wichtiger Funktionen, einschließlich Internationalisierung, API-Integration und responsiver Designmuster.',
      technologies: 'Verwendete Technologien',
      techList: [
        'Next.js 13 - React-Framework mit serverseitigem Rendering',
        'React 18 - Moderne UI-Bibliothek',
        'Tailwind CSS - Utility-First-CSS-Framework',
        'i18n - Internationalisierungsunterstützung',
        'GitHub Actions - Kontinuierliche Integration'
      ],
      backHome: 'Zurück zur Startseite'
    },
    ro: {
      title: 'Despre xdrive-sandbox',
      heading: 'Despre acest proiect',
      description: 'xdrive-sandbox este un proiect demonstrativ pentru o aplicație de marketplace logistic. Prezintă practici moderne de dezvoltare web folosind Next.js, React și Tailwind CSS.',
      purpose: 'Scop',
      purposeText: 'Acest mediu sandbox este conceput pentru a testa și demonstra funcționalități cheie, inclusiv internaționalizare, integrare API și modele de design responsive.',
      technologies: 'Tehnologii utilizate',
      techList: [
        'Next.js 13 - Framework React cu server-side rendering',
        'React 18 - Bibliotecă UI modernă',
        'Tailwind CSS - Framework CSS utility-first',
        'i18n - Suport pentru internaționalizare',
        'GitHub Actions - Integrare continuă'
      ],
      backHome: 'Înapoi la pagina principală'
    }
  }

  const t = translations[locale] || translations.en

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <LanguageSwitcher />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-6 text-gray-900">
              {t.heading}
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                {t.description}
              </p>
              
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {t.purpose}
              </h2>
              <p className="text-gray-700 mb-8">
                {t.purposeText}
              </p>
              
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {t.technologies}
              </h2>
              <ul className="space-y-3 mb-8">
                {t.techList.map((tech, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{tech}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="/" 
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t.backHome}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
