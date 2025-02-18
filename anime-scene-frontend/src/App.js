import React, { useState } from "react";
import { LinearProgress } from "@mui/material";
import { Upload } from "lucide-react";

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  },
  contentWrapper: {
    maxWidth: '36rem',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  gradientBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(to right, #ef4444, #dc2626)'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#475569',
    marginBottom: '0.25rem'
  },
  description: {
    fontSize: '0.875rem',
    color: '#475569'
  },
  uploadArea: {
    border: '2px dashed #e2e8f0',
    borderRadius: '0.75rem',
    padding: '2rem',
    marginBottom: '1.5rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: '#ef4444'
    }
  },
  iconContainer: {
    width: '4rem',
    height: '4rem',
    backgroundColor: '#fef2f2',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    margin: '0 auto'
  },
  uploadButton: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#b91c1c',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  },
  formatText: {
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: '#64748b'
  },
  progressBar: {
    width: '100%',
    marginTop: '1rem'
  }
};

function App() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUploadClick = async () => {
    const fileInput = document.getElementById("fileUpload");
    fileInput.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("video", file);
  
      const options = {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      };
  
      try {
        const response = await fetch("http://localhost:8080/upload", options);
  
        if (response.ok) {
          const message = await response.text();
          setUploadMessage(message);
        } else {
          console.error("Server responded with error:", response.statusText);
          setUploadMessage("Error uploading video");
        }
      } catch (error) {
        console.error("Error uploading video:", error.message);
        setUploadMessage("Error uploading video");
      }
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <div style={styles.gradientBar} />
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={styles.title}>アニメシーン検索</h1>
            <p style={styles.subtitle}>Anime Scene Retrieval Platform</p>
            <p style={styles.description}>
                Anime at your fingertips. Just ask!.
            </p>
          </div>

          <div style={styles.uploadArea} onClick={handleUploadClick}>
            <div style={styles.iconContainer}>
              <Upload size={32} color="#dc2626" />
            </div>
            <p style={styles.subtitle}>ビデオをアップロード</p>
            <p style={styles.description}>Upload Video</p>
          </div>

          <input
            type="file"
            id="fileUpload"
            style={{ display: 'none' }}
            accept="video/*"
            onChange={handleFileChange}
          />

          <button 
            onClick={handleUploadClick}
            style={styles.uploadButton}
          >
            アップロード
          </button>

          <div style={styles.formatText}>
            <p>対応フォーマット / Supported formats:</p>
            <p>MP4・AVI・MKV</p>
          </div>

          {uploadProgress > 0 && (
            <div style={styles.progressBar}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </div>
          )}

          {uploadMessage && (
            <div style={{ marginTop: '1rem' }}>
              <p>{uploadMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
