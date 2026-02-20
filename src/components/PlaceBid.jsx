import { useState } from 'react'
import { supabase } from '../lib/supabase'

function PlaceBid({ jobId, onBidPlaced }) {
  const [bidAmount, setBidAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('User not authenticated')

      const { error: insertError } = await supabase
        .from('job_bids')
        .insert({
          job_id: jobId,
          bidder_id: user.id,
          bid_price_gbp: Number(bidAmount),
          message: message?.trim() || null
        })

      if (insertError) throw insertError

      setSuccess(true)
      setBidAmount('')
      setMessage('')
      if (onBidPlaced) onBidPlaced()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="place-bid">
      <h3>Place a Bid</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bidAmount">Bid Amount (GBP)</label>
          <input
            id="bidAmount"
            type="number"
            min="0"
            step="0.01"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="bidMessage">Message (optional)</label>
          <textarea
            id="bidMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Bid placed successfully!</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Bid...' : 'Place Bid'}
        </button>
      </form>
    </div>
  )
}

export default PlaceBid
