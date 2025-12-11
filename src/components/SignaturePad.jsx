import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export default function SignaturePad({ onSaved }) {
  const sigCanvas = useRef(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const clear = () => {
    sigCanvas.current.clear()
    setIsEmpty(true)
  }

  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Please provide a signature first')
      return
    }
    
    // Get the signature as a base64 PNG
    const signatureData = sigCanvas.current.toDataURL('image/png')
    
    if (onSaved) {
      onSaved(signatureData)
    }
    
    setIsEmpty(false)
  }

  const handleBegin = () => {
    setIsEmpty(false)
  }

  return (
    <div className="signature-pad-container">
      <div className="signature-canvas-wrapper">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'signature-canvas'
          }}
          onBegin={handleBegin}
        />
      </div>
      <div className="signature-buttons mt-3">
        <button 
          type="button" 
          className="btn btn-secondary me-2" 
          onClick={clear}
        >
          Clear
        </button>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={save}
        >
          Save Signature
        </button>
      </div>
    </div>
  )
}
