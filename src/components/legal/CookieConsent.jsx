import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setShow(true)
  }, [])

  function saveConsent(choice) {
    const finalPrefs =
      choice === 'all'
        ? { necessary: true, analytics: true, marketing: true }
        : { ...preferences, necessary: true }

    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ ...finalPrefs, timestamp: new Date().toISOString() })
    )

    if (!finalPrefs.analytics) {
      const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'
      window[`ga-disable-${gaId}`] = true
    }

    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="container mx-auto max-w-4xl">
        {!showCustomize ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="flex-1 text-sm text-gray-700">
              🍪 We use cookies to enhance your experience. By clicking "Accept All", you consent to
              our use of cookies.{' '}
              <a href="#privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setShowCustomize(true)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={() => saveConsent('necessary')}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => saveConsent('all')}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Cookie Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked disabled readOnly className="w-4 h-4" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Necessary</span> – Required for the site to function
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Analytics</span> – Help us understand how you use
                  the site
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Marketing</span> – Personalised ads and content
                </span>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => saveConsent('custom')}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
