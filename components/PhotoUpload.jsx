import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import API_BASE_URL from '../config/api'

export default function PhotoUpload({ jobId, onSuccess }) {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('photo', file)
      if (jobId) formData.append('jobId', jobId)

      const response = await axios.post(`${API_BASE_URL}/api/upload/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setMessage(`✅ Photo uploaded successfully! (${(response.data.size / 1024).toFixed(1)} KB)`)
        if (onSuccess) onSuccess(response.data)
      } else {
        setMessage('❌ Failed to upload photo')
      }
    } catch (error) {
      console.error('Photo upload error:', error)
      setMessage('❌ Error uploading photo. Make sure the server is running.')
    } finally {
      setUploading(false)
    }
  }, [jobId, onSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: uploading
  })

  const clearPreview = () => {
    setPreview(null)
    setMessage('')
  }

  return (
    <div className="photo-upload-container">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="space-y-3">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-48 mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                clearPreview()
              }}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Remove preview
            </button>
          </div>
        ) : (
          <div>
            <svg 
              className="mx-auto h-12 w-12 text-gray-400 mb-3" 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48"
            >
              <path 
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop the photo here</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium mb-1">
                  Drop a photo here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, JPEG, GIF, WEBP up to 10MB
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {uploading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Uploading...</p>
        </div>
      )}

      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        📸 Upload a photo of the delivered package or proof of delivery
      </p>
    </div>
  )
}
