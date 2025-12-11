import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale, locales, pathname, query, asPath } = router

  const localeNames = {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    ro: 'Română'
  }

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-indigo-600">
            xdrive-sandbox
          </div>
          <div className="flex gap-2">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={{ pathname, query }}
                locale={loc}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  locale === loc
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {localeNames[loc] || loc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
