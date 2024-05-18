import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import VideoService from '../Services/videoService';
import { Toast } from 'bootstrap';

const UploadFormComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [toastSuccessVisible, setToastSuccessVisible] = useState<boolean>(false);
  const [toastErrorVisible, setToastErrorVisible] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (file) {
      setUploading(true);
      try {
        await VideoService.uploadVideo(file);
        setUploading(false);
        setToastSuccessVisible(true);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setFile(null);
        setTimeout(() => {
          setToastSuccessVisible(false);
        }, 3000);

        const toastElmt = document.getElementById('toast')
        if (toastElmt) {
          const toastBootstrap = Toast.getOrCreateInstance(toastElmt);
          toastBootstrap.show();
        }




      } catch (error) {
        console.error('Error uploading video:', error);
        setUploading(false);
        setToastErrorVisible(true);
        setTimeout(() => {
          setToastErrorVisible(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3">Upload Video</h2>

      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploading && 
        <span className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      }
      <div id="toast" className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
      {toastErrorVisible && <p style={{ color: 'red' }}>An error occurred during the upload process.</p>}
      {toastSuccessVisible && <p style={{ color: 'green' }}>File uploaded and compressed successfully!</p>}
    </div>
  );
};

export default UploadFormComponent;
