import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

export default function PhotoUpload({ onUploaded }) {
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to server
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('photo', file)

      const response = await axios.post('/api/upload/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      onUploaded(response.data.url)
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }, [onUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false
  })

  return (
    <div className="photo-upload-container">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the photo here...</p>
        ) : (
          <p>Drag & drop a photo here, or click to select</p>
        )}
      </div>
      
      {preview && (
        <div className="photo-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
    </div>
  )
}
