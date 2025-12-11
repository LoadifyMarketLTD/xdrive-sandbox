import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Post() {
  const router = useRouter()
  const { locale } = router
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const translations = {
    en: {
      pageTitle: 'Create a Post',
      title: 'Post Title',
      description: 'Description',
      category: 'Category',
      selectCategory: 'Select a category',
      logistics: 'Logistics',
      transport: 'Transport',
      warehouse: 'Warehouse',
      other: 'Other',
      submit: 'Submit Post',
      success: 'Post submitted successfully!',
      backHome: 'Back to Home'
    },
    fr: {
      pageTitle: 'Créer une Publication',
      title: 'Titre de la Publication',
      description: 'Description',
      category: 'Catégorie',
      selectCategory: 'Sélectionnez une catégorie',
      logistics: 'Logistique',
      transport: 'Transport',
      warehouse: 'Entrepôt',
      other: 'Autre',
      submit: 'Soumettre',
      success: 'Publication soumise avec succès!',
      backHome: 'Retour à l\'Accueil'
    },
    de: {
      pageTitle: 'Beitrag Erstellen',
      title: 'Beitragstitel',
      description: 'Beschreibung',
      category: 'Kategorie',
      selectCategory: 'Kategorie auswählen',
      logistics: 'Logistik',
      transport: 'Transport',
      warehouse: 'Lager',
      other: 'Andere',
      submit: 'Absenden',
      success: 'Beitrag erfolgreich eingereicht!',
      backHome: 'Zurück zur Startseite'
    },
    ro: {
      pageTitle: 'Creează o Postare',
      title: 'Titlul Postării',
      description: 'Descriere',
      category: 'Categorie',
      selectCategory: 'Selectează o categorie',
      logistics: 'Logistică',
      transport: 'Transport',
      warehouse: 'Depozit',
      other: 'Altele',
      submit: 'Trimite',
      success: 'Postarea a fost trimisă cu succes!',
      backHome: 'Înapoi la Pagina Principală'
    }
  }

  const t = translations[locale] || translations.en

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // In a real app, this would send data to an API
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <Head>
        <title>{t.pageTitle} - xdrive-sandbox</title>
        <meta name="description" content="Create a new post" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LanguageSwitcher />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
              {t.pageTitle}
            </h1>

            {submitted ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {t.success}
                  </h2>
                  <Link 
                    href="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {t.backHome}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.title}
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t.title}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.description}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t.description}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.category}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">{t.selectCategory}</option>
                      <option value="logistics">{t.logistics}</option>
                      <option value="transport">{t.transport}</option>
                      <option value="warehouse">{t.warehouse}</option>
                      <option value="other">{t.other}</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      {t.submit}
                    </button>
                    <Link
                      href="/"
                      className="flex-1 text-center bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      {t.backHome}
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
