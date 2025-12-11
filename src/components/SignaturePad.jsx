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
    </div>
  )
}
