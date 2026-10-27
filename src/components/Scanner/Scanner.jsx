import { useState, useRef, useEffect } from "react";
import { FOOD_DATABASE } from "../../services/foodData";
import "./Scanner.css";

function Scanner({ onAnalyze, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [analyzingStep, setAnalyzingStep] = useState(0);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const dragCounter = useRef(0);

  // Cycling analyzing status messages
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      setAnalyzingStep(0);
      interval = setInterval(() => {
        setAnalyzingStep((prev) => (prev + 1) % 3);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Listen for clipboard paste anywhere in window
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Drag & drop handlers with counter to prevent flickering
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      setDragActive(false);
      dragCounter.current = 0;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Process uploaded or dropped image file
  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreviewImage(dataUrl);
      onAnalyze(dataUrl, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Camera Management
  const startCamera = async (mode = facingMode) => {
    setCameraError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera is not supported on this browser or insecure connection.");
      return;
    }

    // Stop existing stream if switching
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Unable to access camera. Please allow camera permissions in your browser.");
    }
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      // Ensure camera is released on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    stopCamera();
    setPreviewImage(dataUrl);
    onAnalyze(dataUrl, "camera-snap.jpg");
  };

  // Handle image URL submission
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setPreviewImage(imageUrl);
    setUrlInputOpen(false);
    onAnalyze(imageUrl, "web-dish.jpg");
    setImageUrl("");
  };

  // Filtered sample dishes
  const categories = ["All", "High Protein", "Vegetarian", "World Flavors", "Quick Bites"];

  const filteredDishes = FOOD_DATABASE.filter((dish) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "High Protein" && dish.dietaryTags?.some((t) => t.includes("High Protein"))) ||
      (activeCategory === "Vegetarian" && dish.dietaryTags?.some((t) => t.includes("Vegetarian") || t.includes("Vegan"))) ||
      (activeCategory === "World Flavors" && (dish.category.includes("African") || dish.category.includes("Asian") || dish.category.includes("Mexican") || dish.category.includes("Italian"))) ||
      (activeCategory === "Quick Bites" && (dish.recipe.cookTime.includes("0") || dish.recipe.cookTime.includes("5") || dish.recipe.cookTime.includes("10")));

    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dish.aliases && dish.aliases.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const analyzingMessages = [
    "🔍 Scanning image textures & food geometries...",
    "🧠 Matching against 1,000+ dish culinary models...",
    "📊 Computing macronutrients & preparing chef recipe...",
  ];

  return (
    <section id="scanner" className="scanner-section">
      <div className="scanner-container">
        <div className="scanner-header">
          <div className="scanner-pill-badge">⚡ Instant AI Recognition</div>
          <h2 className="scanner-title">Scan, Snap or Upload Your Meal</h2>
          <p className="scanner-subtitle">
            Take a photo, drop an image, or paste from clipboard to decode calories, macronutrients, allergens, and authentic recipes.
          </p>
        </div>

        {/* State 1: Active Neural Inference Scanning */}
        {isAnalyzing ? (
          <div className="analyzing-card">
            <div className="scan-preview-box">
              {previewImage ? (
                <img src={previewImage} alt="Scanning target" className="scan-preview-img" />
              ) : (
                <div className="scan-preview-placeholder">🍱</div>
              )}
              <div className="scanner-laser-line"></div>
              <div className="viewfinder-corner top-left"></div>
              <div className="viewfinder-corner top-right"></div>
              <div className="viewfinder-corner bottom-left"></div>
              <div className="viewfinder-corner bottom-right"></div>
            </div>

            <div className="analyzing-status">
              <div className="scanner-spinner"></div>
              <h3 className="analyzing-title">Analyzing Plate with FoodLens AI</h3>
              <p className="analyzing-step-text">{analyzingMessages[analyzingStep]}</p>
              <div className="scan-progress-bar">
                <div className="scan-progress-fill"></div>
              </div>
            </div>
          </div>
        ) : cameraActive ? (
          /* State 2: Live Viewfinder Camera */
          <div className="camera-view-card">
            <div className="camera-frame">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
              ></video>
              <div className="camera-viewfinder-grid"></div>
              <div className="viewfinder-corner top-left"></div>
              <div className="viewfinder-corner top-right"></div>
              <div className="viewfinder-corner bottom-left"></div>
              <div className="viewfinder-corner bottom-right"></div>
              <div className="camera-hint">Align your dish within the frame</div>
            </div>

            <div className="camera-actions">
              <button
                type="button"
                className="scanner-btn switch-cam-btn"
                onClick={toggleCameraFacing}
                title="Switch Camera (Front/Rear)"
              >
                🔄 Flip Cam
              </button>
              <button
                type="button"
                className="scanner-btn capture-btn"
                onClick={capturePhoto}
              >
                📸 Snap & Analyze
              </button>
              <button
                type="button"
                className="scanner-btn cancel-btn"
                onClick={stopCamera}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* State 3: Interactive Dropzone & Controls */
          <div className="dropzone-wrapper">
            <div
              className={`dropzone ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
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
                <div className="dropzone-icon-wrap">
                  <span className="upload-icon">📸</span>
                  <span className="plus-icon">+</span>
                </div>
                <h3 className="dropzone-prompt">Drag & drop your food photo here</h3>
                <p className="dropzone-sub">
                  or browse files from your device • Paste with <kbd>Ctrl+V</kbd>
                </p>

                <div className="button-group" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="scanner-btn primary"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    📁 Browse File
                  </button>
                  <button
                    type="button"
                    className="scanner-btn secondary"
                    onClick={() => startCamera()}
                  >
                    📷 Live Camera
                  </button>
                  <button
                    type="button"
                    className="scanner-btn tertiary"
                    onClick={() => setUrlInputOpen(!urlInputOpen)}
                  >
                    🔗 Image URL
                  </button>
                </div>

                {cameraError && <p className="camera-error">{cameraError}</p>}
              </div>
            </div>

            {/* Direct URL Input Accordion */}
            {urlInputOpen && (
              <form className="url-input-form" onSubmit={handleUrlSubmit}>
                <input
                  type="url"
                  placeholder="Paste food image URL (e.g. https://.../photo.jpg)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="url-text-field"
                  required
                />
                <button type="submit" className="scanner-btn primary small">
                  Analyze Link
                </button>
              </form>
            )}
          </div>
        )}

        {/* Quick Sample Presets & Explore */}
        <div className="samples-container">
          <div className="samples-top-row">
            <div>
              <h3 className="samples-heading">Or try an instant sample dish</h3>
              <p className="samples-sub">Click any dish to test recognition and nutrition calculations</p>
            </div>

            {/* Category Filter Pills */}
            <div className="category-filter-chips">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search */}
          <div className="samples-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search sample dishes (e.g. Ramen, Jollof, Tacos, Acai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="samples-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sample Chips Grid */}
          <div className="sample-chips-grid">
            {filteredDishes.map((item) => (
              <button
                key={item.id}
                type="button"
                className="sample-dish-card"
                onClick={() => {
                  setPreviewImage(item.image);
                  onAnalyze(item.image, item.id);
                }}
                disabled={isAnalyzing}
              >
                <div className="dish-card-img-wrap">
                  <img src={item.image} alt={item.name} className="dish-card-img" />
                  <span className="dish-card-cal">
                    {item.nutritionPerServing.calories} kcal
                  </span>
                </div>
                <div className="dish-card-body">
                  <span className="dish-card-cat">{item.category}</span>
                  <h4 className="dish-card-name">{item.name}</h4>
                  <div className="dish-card-macros">
                    <span>P: {item.nutritionPerServing.protein}g</span>
                    <span>C: {item.nutritionPerServing.carbs}g</span>
                    <span>F: {item.nutritionPerServing.fat}g</span>
                  </div>
                </div>
              </button>
            ))}

            {filteredDishes.length === 0 && (
              <div className="no-samples-found">
                <p>No dishes match "{searchQuery}". Try another keyword or upload your custom meal!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Scanner;
