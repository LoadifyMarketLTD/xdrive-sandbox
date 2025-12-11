import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function PhotoUpload({ jobId }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    setUploadSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('jobId', jobId);

      await axios.post('http://localhost:3001/api/upload/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadSuccess(true);
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Server may not be running.');
    } finally {
      setUploading(false);
    }
  }, [jobId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    multiple: false,
  });

  return (
    <div className="photo-upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="photo-preview">
            <img src={preview} alt="Preview" />
            {uploadSuccess && <div className="upload-success">✓ Uploaded</div>}
          </div>
        ) : (
          <div className="dropzone-content">
            {uploading ? (
              <p>Uploading...</p>
            ) : isDragActive ? (
              <p>Drop the photo here...</p>
            ) : (
              <p>Drag & drop a photo here, or click to select</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoUpload;
