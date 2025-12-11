import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

export default function PhotoUpload() {
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      // Upload to server
      uploadPhoto(file)
    }
  }, [])

  const uploadPhoto = async (file) => {
    setUploading(true)
    setUploadStatus('')
    
    const formData = new FormData()
    formData.append('photo', file)

    try {
      const response = await axios.post('/api/upload/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setUploadStatus('Photo uploaded successfully!')
      console.log('Upload response:', response.data)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  })

  return (
    <div className="photo-upload-container">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the photo here...</p>
        ) : (
          <p>Drag & drop a photo here, or click to select</p>
        )}
      </div>
      
      {preview && (
        <div className="preview-container mt-3">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}
      
      {uploading && (
        <div className="mt-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Uploading...</span>
          </div>
          <span className="ms-2">Uploading...</span>
        </div>
      )}
      
      {uploadStatus && (
        <div className={`alert ${uploadStatus.includes('success') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
          {uploadStatus}
        </div>
      )}
    </div>
  )
}
