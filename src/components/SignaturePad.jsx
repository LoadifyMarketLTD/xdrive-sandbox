import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function SignaturePad({ onSaved }) {
  const sigPadRef = useRef(null);

  const clear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      onSaved(null);
    }
  };

  const save = () => {
    if (sigPadRef.current) {
      if (sigPadRef.current.isEmpty()) {
        alert('Please provide a signature first');
        return;
      }
      const dataURL = sigPadRef.current.toDataURL('image/png');
      onSaved(dataURL);
    }
  };

  return (
    <div className="signature-pad-container">
      <div className="signature-canvas-wrapper">
        <SignatureCanvas
          ref={sigPadRef}
          canvasProps={{
            className: 'signature-canvas',
          }}
          backgroundColor="white"
        />
      </div>
      <div className="signature-actions">
        <button type="button" className="button-secondary" onClick={clear}>
          Clear
        </button>
        <button type="button" className="button-primary" onClick={save}>
          Save Signature
        </button>
      </div>
    </div>
  );
}

export default SignaturePad;
