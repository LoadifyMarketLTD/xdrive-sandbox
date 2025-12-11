import React, { useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import SignatureCanvas from 'react-signature-canvas'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import L from 'leaflet'

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function App() {
  const sigCanvas = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [signatureData, setSignatureData] = useState(null)
  const [status, setStatus] = useState('')

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData()
    acceptedFiles.forEach(file => {
      formData.append('photos', file)
    })

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUploadedFiles(prev => [...prev, ...response.data.files])
      setStatus('Photos uploaded successfully!')
    } catch (error) {
      setStatus('Upload failed: ' + error.message)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  })

  const clearSignature = () => {
    sigCanvas.current?.clear()
    setSignatureData(null)
  }

  const saveSignature = async () => {
    if (sigCanvas.current?.isEmpty()) {
      setStatus('Please provide a signature first!')
      return
    }

    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    setSignatureData(dataURL)

    try {
      await axios.post('http://localhost:3001/api/signature', { signature: dataURL })
      setStatus('Signature saved successfully!')
    } catch (error) {
      setStatus('Signature save failed: ' + error.message)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>XDrive UI Mock - Full Stack Demo</h1>
        <p>Interactive map, signature capture, and photo upload</p>
      </header>

      <main>
        {/* Map Section */}
        <section className="map-section">
          <h2>📍 Delivery Location Map</h2>
          <div className="map-container">
            <MapContainer 
              center={[51.505, -0.09]} 
              zoom={13} 
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  Delivery Location<br />London, UK
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* Signature Section */}
        <section className="signature-section">
          <h2>✍️ Signature Capture</h2>
          <div className="signature-container">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                className: 'signature-canvas'
              }}
            />
          </div>
          <div className="signature-buttons">
            <button onClick={clearSignature}>Clear</button>
            <button onClick={saveSignature} className="primary">Save Signature</button>
          </div>
          {signatureData && (
            <div className="signature-preview">
              <h3>Saved Signature:</h3>
              <img src={signatureData} alt="Signature" />
            </div>
          )}
        </section>

        {/* Photo Upload Section */}
        <section className="upload-section">
          <h2>📷 Photo Upload</h2>
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag & drop photos here, or click to select files</p>
            )}
          </div>
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <h3>Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((file, idx) => (
                  <li key={idx}>{file}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {status && (
          <div className="status-message">
            {status}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
