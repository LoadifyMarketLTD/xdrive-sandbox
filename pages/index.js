import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { locale } = router
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    // Load translations for the current locale
    fetch(`/locales/${locale}/common.json`)
      .then(res => res.json())
      .then(data => setTranslations(data))
      .catch(err => console.error('Failed to load translations:', err))
  }, [locale])

  const changeLocale = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {translations.title || 'Loading...'}
        </h1>
        
        <div className="mb-8 text-center">
          <p className="text-xl mb-4">{translations.welcome || 'Loading...'}</p>
          <p className="text-gray-600">{translations.description || 'Loading...'}</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => changeLocale('en')}
            className={`px-4 py-2 rounded ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            English
          </button>
          <button
            onClick={() => changeLocale('fr')}
            className={`px-4 py-2 rounded ${locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Français
          </button>
          <button
            onClick={() => changeLocale('de')}
            className={`px-4 py-2 rounded ${locale === 'de' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Deutsch
          </button>
          <button
            onClick={() => changeLocale('ro')}
            className={`px-4 py-2 rounded ${locale === 'ro' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Română
          </button>
        </div>

        <div className="grid text-center lg:grid-cols-3 lg:text-left gap-4">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              {translations.features?.docs || 'Docs'}
            </h2>
            <p className="m-0 text-sm opacity-50">
              {translations.features?.docsDesc || 'Find in-depth information about features and API.'}
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              {translations.features?.learn || 'Learn'}
            </h2>
            <p className="m-0 text-sm opacity-50">
              {translations.features?.learnDesc || 'Learn about Next.js in an interactive course.'}
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              {translations.features?.deploy || 'Deploy'}
            </h2>
            <p className="m-0 text-sm opacity-50">
              {translations.features?.deployDesc || 'Instantly deploy your Next.js site to a public URL.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
