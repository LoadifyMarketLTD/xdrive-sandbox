import { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000'

const BANK_DETAILS = {
  account_name: 'XDrive Logistics Ltd',
  account_number: '12345678',
  sort_code: '12-34-56',
  bank_name: 'Lloyds Bank'
}

export default function PaymentSelector({ amount, invoiceId, jobId, onSuccess }) {
  const [method, setMethod] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const bankReference = `XDL-${(invoiceId || jobId || 'REF').toString().slice(0, 8).toUpperCase()}`

  const handleBankConfirm = async () => {
    setLoading(true)
    setMessage('')
    try {
      const response = await axios.post(`${API_BASE_URL}/api/payments/create`, {
        method: 'bank_transfer',
        amount,
        currency: 'GBP',
        jobId,
        invoiceId,
        reference: bankReference
      })
      if (response.data.success) {
        setMessage('✅ Bank transfer intent recorded. Please use the reference above when making your payment.')
        if (onSuccess) onSuccess(response.data)
      }
    } catch (error) {
      setMessage('❌ Failed to record payment intent. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePayPal = async () => {
    setLoading(true)
    setMessage('')
    try {
      const response = await axios.post(`${API_BASE_URL}/api/payments/create`, {
        method: 'paypal',
        amount,
        currency: 'GBP',
        jobId,
        invoiceId
      })
      if (response.data.success) {
        if (response.data.checkout_url) {
          window.open(response.data.checkout_url, '_blank', 'noopener,noreferrer')
        }
        setMessage('✅ PayPal checkout opened. Complete payment in the new window.')
        if (onSuccess) onSuccess(response.data)
      }
    } catch (error) {
      setMessage('❌ Failed to initiate PayPal payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Select Payment Method</h3>

      {amount && (
        <p className="text-2xl font-bold text-blue-600">
          £{Number(amount).toFixed(2)} GBP
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setMethod('bank')}
          className={`p-4 border-2 rounded-lg text-left transition-colors ${
            method === 'bank'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="text-2xl mb-1">🏦</div>
          <div className="font-medium text-gray-900">Bank Transfer</div>
          <div className="text-xs text-green-600 font-medium">0% fee</div>
        </button>

        <button
          onClick={() => setMethod('paypal')}
          className={`p-4 border-2 rounded-lg text-left transition-colors ${
            method === 'paypal'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="text-2xl mb-1">💳</div>
          <div className="font-medium text-gray-900">PayPal</div>
          <div className="text-xs text-gray-500">~2.9% + £0.30</div>
        </button>
      </div>

      {method === 'bank' && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-gray-900">Bank Transfer Details</h4>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="text-gray-500 pr-4 py-1">Account Name:</td>
                <td className="font-medium text-gray-900">{BANK_DETAILS.account_name}</td>
              </tr>
              <tr>
                <td className="text-gray-500 pr-4 py-1">Account Number:</td>
                <td className="font-medium text-gray-900">{BANK_DETAILS.account_number}</td>
              </tr>
              <tr>
                <td className="text-gray-500 pr-4 py-1">Sort Code:</td>
                <td className="font-medium text-gray-900">{BANK_DETAILS.sort_code}</td>
              </tr>
              <tr>
                <td className="text-gray-500 pr-4 py-1">Reference:</td>
                <td className="font-bold text-blue-600">{bankReference}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500">
            ⚠️ Please include the reference above so we can identify your payment.
          </p>
          <button
            onClick={handleBankConfirm}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Recording...' : 'Confirm Bank Transfer Intent'}
          </button>
        </div>
      )}

      {method === 'paypal' && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-gray-900">Pay with PayPal</h4>
          <p className="text-sm text-gray-600">
            You will be redirected to PayPal to complete your payment securely.
          </p>
          <button
            onClick={handlePayPal}
            disabled={loading}
            className="w-full px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting...' : '💳 Pay with PayPal'}
          </button>
        </div>
      )}

      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
