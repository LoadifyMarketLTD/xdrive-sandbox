import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

function PhotoUpload({ onPhotoUploaded }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    onPhotoUploaded(file)

    // Upload to server
    const formData = new FormData()
    formData.append('photo', file)

    try {
      const response = await axios.post(
        'http://localhost:3001/api/upload/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('Photo uploaded successfully:', response.data)
    } catch (error) {
      console.error('Failed to upload photo:', error)
    }
  }, [onPhotoUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the photo here...</p>
      ) : (
        <p>Drag & drop a photo here, or click to select</p>
      )}
    </div>
  )
}

export default PhotoUpload
