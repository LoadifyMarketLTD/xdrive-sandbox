import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DeleteAccount({ onDeleted, onCancel }) {
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleDelete() {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Not authenticated')

      // Anonymise personal data (GDPR Article 17 – Right to Erasure)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          email: `deleted-${Date.now()}@anonymized.com`,
          full_name: 'Deleted User',
          phone: null,
          address: null,
          status: 'deleted',
          deleted_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Anonymise jobs posted by the user (preserve business data)
      await supabase.from('jobs').update({ posted_by: null }).eq('posted_by', user.id)

      // Sign out
      await supabase.auth.signOut()

      if (onDeleted) onDeleted()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-red-600">Delete Account</h2>
        <p className="text-sm text-gray-600 mt-1">
          This action is irreversible. Your personal data will be anonymised in accordance with GDPR
          Article 17 (Right to Erasure).
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-red-700 mb-2">What will happen:</h3>
        <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
          <li>Your personal data will be anonymised</li>
          <li>Your account will be permanently disabled</li>
          <li>Job history will be retained without your identity</li>
          <li>You will be logged out immediately</li>
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type <span className="font-bold text-red-600">DELETE</span> to confirm:
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE"
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading || confirmText !== 'DELETE'}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Deleting...' : 'Delete My Account'}
        </button>
      </div>
    </div>
  )
}
