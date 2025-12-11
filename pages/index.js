import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LanguageSwitcher from '../components/LanguageSwitcher'
import JobCard from '../components/JobCard'

// Dynamically import components with no SSR (they require window/browser APIs)
const MapRoute = dynamic(() => import('../components/MapRoute'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">Loading map...</div>
})

const SignaturePad = dynamic(() => import('../components/SignaturePad'), {
  ssr: false,
  loading: () => <div className="p-4">Loading signature pad...</div>
})

const PhotoUpload = dynamic(() => import('../components/PhotoUpload'), {
  ssr: false,
  loading: () => <div className="p-4">Loading photo upload...</div>
})

export default function Home() {
  const router = useRouter()
  const { locale } = router
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [showPODModal, setShowPODModal] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState(null)
  
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
      aboutLink: 'About Page',
      testApi: 'Test API',
      liveTracking: 'Live Tracking',
      trackingDescription: 'Track your shipment in real-time from collection to delivery',
      jobs: 'Active Jobs',
      jobsDescription: 'Current delivery jobs from the backend',
      proofOfDelivery: 'Proof of Delivery',
      podDescription: 'Capture signature and photo for delivery confirmation',
      openPOD: 'Open Proof of Delivery',
      closePOD: 'Close',
      signature: 'Signature',
      photoUpload: 'Photo Upload'
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
      aboutLink: 'Page À propos',
      testApi: 'Tester API',
      liveTracking: 'Suivi en Direct',
      trackingDescription: 'Suivez votre expédition en temps réel de la collecte à la livraison',
      jobs: 'Tâches Actives',
      jobsDescription: 'Tâches de livraison actuelles du backend',
      proofOfDelivery: 'Preuve de Livraison',
      podDescription: 'Capturez la signature et la photo pour la confirmation de livraison',
      openPOD: 'Ouvrir Preuve de Livraison',
      closePOD: 'Fermer',
      signature: 'Signature',
      photoUpload: 'Télécharger Photo'
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
      aboutLink: 'Über-Seite',
      testApi: 'API testen',
      liveTracking: 'Live-Verfolgung',
      trackingDescription: 'Verfolgen Sie Ihre Sendung in Echtzeit von der Abholung bis zur Lieferung',
      jobs: 'Aktive Aufträge',
      jobsDescription: 'Aktuelle Lieferaufträge vom Backend',
      proofOfDelivery: 'Liefernachweis',
      podDescription: 'Unterschrift und Foto zur Lieferbestätigung erfassen',
      openPOD: 'Liefernachweis Öffnen',
      closePOD: 'Schließen',
      signature: 'Unterschrift',
      photoUpload: 'Foto Hochladen'
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
      aboutLink: 'Pagina Despre',
      testApi: 'Testează API',
      liveTracking: 'Urmărire Live',
      trackingDescription: 'Urmăriți transportul dvs. în timp real de la colectare la livrare',
      jobs: 'Sarcini Active',
      jobsDescription: 'Sarcinile de livrare curente de la backend',
      proofOfDelivery: 'Dovada Livrării',
      podDescription: 'Capturați semnătura și fotografia pentru confirmarea livrării',
      openPOD: 'Deschide Dovada Livrării',
      closePOD: 'Închide',
      signature: 'Semnătură',
      photoUpload: 'Încarcă Fotografie'
    }
  }

  const t = translations[locale] || translations.en

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/jobs')
        if (response.data.success) {
          setJobs(response.data.jobs)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
        // Silently fail - backend might not be running
      } finally {
        setLoadingJobs(false)
      }
    }

    fetchJobs()
  }, [])

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
                <Link 
                  href="/about" 
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {t.aboutLink}
                </Link>
                <a 
                  href="/api/hello" 
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.testApi}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {t.liveTracking}
              </h2>
              <p className="text-gray-700 mb-6">
                {t.trackingDescription}
              </p>
              <MapRoute />
            </div>

            {/* Jobs Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {t.jobs}
              </h2>
              <p className="text-gray-700 mb-6">
                {t.jobsDescription}
              </p>
              
              {loadingJobs ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 mt-3">Loading jobs...</p>
                </div>
              ) : jobs.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No jobs available. Make sure the backend server is running on port 4000.</p>
                  <p className="text-sm mt-2">Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run start:server</code></p>
                </div>
              )}
            </div>

            {/* Proof of Delivery Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {t.proofOfDelivery}
              </h2>
              <p className="text-gray-700 mb-6">
                {t.podDescription}
              </p>
              <button
                onClick={() => setShowPODModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {t.openPOD}
              </button>
            </div>

            <div className="text-center text-gray-600">
              <p>Current locale: <span className="font-semibold">{locale}</span></p>
            </div>
          </div>
        </main>

        {/* POD Modal */}
        {showPODModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">{t.proofOfDelivery}</h3>
                <button
                  onClick={() => setShowPODModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Signature Section */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">{t.signature}</h4>
                  <SignaturePad 
                    jobId={selectedJobId} 
                    onSuccess={(data) => {
                      console.log('Signature saved:', data)
                    }}
                  />
                </div>

                {/* Photo Upload Section */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">{t.photoUpload}</h4>
                  <PhotoUpload 
                    jobId={selectedJobId}
                    onSuccess={(data) => {
                      console.log('Photo uploaded:', data)
                    }}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowPODModal(false)}
                    className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {t.closePOD}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
