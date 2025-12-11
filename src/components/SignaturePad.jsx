import React, { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

function SignaturePad({ onSaved }) {
  const sigRef = useRef(null)

  const handleClear = () => {
    sigRef.current.clear()
  }

  const handleSave = () => {
    if (sigRef.current.isEmpty()) {
      alert('Please provide a signature first')
      return
    }
    const signatureData = sigRef.current.toDataURL('image/png')
    onSaved(signatureData)
  }

  return (
    <div className="signature-pad-container">
      <SignatureCanvas
        ref={sigRef}
        canvasProps={{
          className: 'signature-canvas'
        }}
      />
      <div className="signature-controls">
        <button className="btn btn-secondary btn-small" onClick={handleClear}>
          Clear
        </button>
        <button className="btn btn-primary btn-small" onClick={handleSave}>
          Save Signature
        </button>
      </div>
    </div>
  )
}

export default SignaturePad
