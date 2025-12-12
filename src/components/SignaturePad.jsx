import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export default function SignaturePad({ onSaved }) {
  const sigPadRef = useRef(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const clear = () => {
    sigPadRef.current?.clear()
    setIsEmpty(true)
    onSaved(null)
  }

  const save = () => {
    if (sigPadRef.current?.isEmpty()) {
      alert('Please provide a signature first')
      return
    }
    
    const dataURL = sigPadRef.current?.toDataURL('image/png')
    setIsEmpty(false)
    onSaved(dataURL)
  }

  const handleEnd = () => {
    setIsEmpty(sigPadRef.current?.isEmpty() || false)
    if (!sigPadRef.current?.isEmpty()) {
      const dataURL = sigPadRef.current?.toDataURL('image/png')
      onSaved(dataURL)
import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000'

export default function SignaturePad({ jobId, onSuccess }) {
  const sigCanvas = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const clearSignature = () => {
    sigCanvas.current.clear()
    setMessage('')
  }

  const saveSignature = async () => {
    if (sigCanvas.current.isEmpty()) {
      setMessage('Please provide a signature first')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const signatureData = sigCanvas.current.toDataURL('image/png')
      
      const response = await axios.post(`${API_BASE_URL}/api/upload/signature`, {
        signature: signatureData,
        jobId: jobId || null
      })

      if (response.data.success) {
        setMessage('✅ Signature saved successfully!')
        sigCanvas.current.clear()
        if (onSuccess) onSuccess(response.data)
      } else {
        setMessage('❌ Failed to save signature')
      }
    } catch (error) {
      console.error('Signature upload error:', error)
      setMessage('❌ Error uploading signature. Make sure the server is running.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="signature-pad-container">
      <div className="signature-canvas-wrapper">
        <SignatureCanvas
          ref={sigPadRef}
          canvasProps={{
            className: 'signature-canvas'
          }}
          onEnd={handleEnd}
        />
      </div>
      <div className="signature-controls">
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={clear}
        >
          Clear
        </button>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={save}
          disabled={isEmpty}
        >
          Save Signature
        </button>
      </div>
      {!isEmpty && (
        <p className="success-message">✓ Signature captured</p>
      )}
      <div className="border-2 border-gray-300 rounded-lg bg-white">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'signature-canvas w-full h-48 cursor-crosshair',
            style: { touchAction: 'none' }
          }}
          backgroundColor="white"
        />
      </div>
      
      <div className="flex gap-3 mt-4">
        <button
          onClick={clearSignature}
          disabled={uploading}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
        >
          {uploading ? 'Saving...' : 'Save Signature'}
        </button>
      </div>

      {message && (
        <div className={`mt-3 p-3 rounded-lg ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-3">
        Sign in the box above using your mouse or touchscreen
      </p>
    </div>
  )
}
