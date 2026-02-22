import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000'

export default function AdminPayments({ onClose }) {
  const [pendingPayments, setPendingPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadPendingPayments()
  }, [])

  async function loadPendingPayments() {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/payments`)
      const pending = (response.data.payments || []).filter(
        (p) => p.status === 'pending' && p.method === 'bank_transfer'
      )
      setPendingPayments(pending)
    } catch (error) {
      setMessage('❌ Failed to load payments. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  async function confirmPayment(paymentId) {
    const notes = window.prompt('Add confirmation notes (optional):')

    try {
      const response = await axios.post(`${API_BASE_URL}/api/payments/confirm`, {
        paymentId,
        notes: notes || ''
      })
      if (response.data.success) {
        setMessage('✅ Payment confirmed!')
        loadPendingPayments()
      }
    } catch (error) {
      setMessage('❌ Failed to confirm payment.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          🏦 Pending Bank Transfers
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading payments...</p>
        </div>
      ) : pendingPayments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No pending bank transfers.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Reference</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Job</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">{payment.reference}</td>
                  <td className="px-4 py-3 font-medium">
                    £{Number(payment.amount).toFixed(2)} {payment.currency}
                  </td>
                  <td className="px-4 py-3 text-gray-600">Job #{payment.jobId}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(payment.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => confirmPayment(payment.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                    >
                      ✓ Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
