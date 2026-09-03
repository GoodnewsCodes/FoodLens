import { useState, useRef } from "react";
import { FOOD_DATABASE } from "../../services/foodData";
import "./Scanner.css";

function Scanner({ onAnalyze, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Process selected file
  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onAnalyze(e.target.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Camera Management
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Unable to access camera. Please check camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    onAnalyze(dataUrl, "camera-snap.jpg");
  };

  return (
    <section id="scanner" className="scanner-section">
      <div className="scanner-container">
        <div className="scanner-header">
          <h2 className="scanner-title">Scan or Upload Your Food</h2>
          <p className="scanner-subtitle">
            Upload a meal photo or capture one with your camera to identify ingredients, nutrition facts, and full recipes.
          </p>
        </div>

        {isAnalyzing ? (
          <div className="analyzing-card">
            <div className="spinner"></div>
            <h3>Analyzing Food with AI...</h3>
            <p>Identifying ingredients, computing calories & macronutrients, and preparing the recipe.</p>
          </div>
        ) : cameraActive ? (
          <div className="camera-view-card">
            <video ref={videoRef} autoPlay playsInline className="camera-video"></video>
            <div className="camera-actions">
              <button className="scanner-btn capture-btn" onClick={capturePhoto}>
                📸 Snap Photo
              </button>
              <button className="scanner-btn cancel-btn" onClick={stopCamera}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`dropzone ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="file-input-hidden"
              onChange={handleFileInputChange}
            />
            <div className="dropzone-content">
              <div className="upload-icon">📸</div>
              <h3>Drag & drop your food image here</h3>
              <p>or click to browse from your device</p>
              <div className="button-group" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="scanner-btn primary"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  Choose File
                </button>
                <button
                  type="button"
                  className="scanner-btn secondary"
                  onClick={startCamera}
                >
                  📷 Live Camera
                </button>
              </div>
              {cameraError && <p className="camera-error">{cameraError}</p>}
            </div>
          </div>
        )}

        {/* Quick Sample Presets */}
        <div className="samples-container">
          <p className="samples-heading">Or try an instant sample dish:</p>
          <div className="sample-chips">
            {FOOD_DATABASE.map((item) => (
              <button
                key={item.id}
                type="button"
                className="sample-chip"
                onClick={() => onAnalyze(item.image, item.id)}
                disabled={isAnalyzing}
              >
                <img src={item.image} alt={item.name} className="chip-img" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Scanner;
