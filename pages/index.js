import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const { locale } = router
  const [messages, setMessages] = useState({})

  useEffect(() => {
    // Load locale messages
    const loadMessages = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`)
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('Failed to load messages:', error)
        setMessages({ welcome: 'Welcome', description: 'This is a demo page' })
      }
    }
    loadMessages()
  }, [locale])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {messages.welcome || 'Welcome'}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {messages.description || 'This is a demo page'}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {messages.currentLocale || 'Current Locale'}: <span className="text-indigo-600">{locale}</span>
            </h2>
            <p className="text-gray-600 mb-4">
              {messages.switchLocale || 'Switch locale using the links below:'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/" locale="en" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                English
              </a>
              <a href="/fr" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Français
              </a>
              <a href="/de" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Deutsch
              </a>
              <a href="/ro" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Română
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {messages.features || 'Features'}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                Next.js 13 with React 18
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                Tailwind CSS for styling
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                i18n support (en, fr, de, ro)
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                API endpoints
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                CI/CD workflows
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
