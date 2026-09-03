import { useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Button from "./components/Button/Button";
import Scanner from "./components/Scanner/Scanner";
import Results from "./components/Results/Results";
import Footer from "./components/Footer/Footer";
import { recognizeFoodImage } from "./services/foodRecognitionService";
import heroImage from "./assets/hero.jpg";
import lensImage from "./assets/lens.png";
import lockImage from "./assets/lock.png";
import brainImage from "./assets/brain.png";
import globeImage from "./assets/globe.png";
import "./App.css";

function App() {
  const [resultData, setResultData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scannerRef = useRef(null);

  const handleStartScan = () => {
    if (resultData) {
      setResultData(null);
    }
    setTimeout(() => {
      const el = document.getElementById("scanner");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleAnalyze = async (imageInput, fileNameOrId) => {
    setIsAnalyzing(true);
    // Smooth scroll to scanner area so user sees the analyzing animation
    const el = document.getElementById("scanner");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    try {
      const recognitionResult = await recognizeFoodImage(imageInput, fileNameOrId);
      setResultData(recognitionResult);
    } catch (err) {
      console.error("Food recognition failed:", err);
      alert("An error occurred while recognizing food. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResultData(null);
    setTimeout(() => {
      const el = document.getElementById("scanner");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="app-root">
      <Navbar onStartScan={handleStartScan} />

      {!resultData ? (
        <>
          <section
            className="hero"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="hero-container">
              <h1 className="hero-text">Know more about your food in one Snap📸</h1>
              <Button action="Get Started" onClick={handleStartScan} />
            </div>
          </section>

          {/* Interactive Food Scanner */}
          <div ref={scannerRef}>
            <Scanner onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* Features Section */}
          <section id="features" className="feature">
            <h1 className="feature-text">Features</h1>
            <div className="features">
              <div className="feature-item">
                <img src={lensImage} alt="Feature 1" />
                <h2>Smart Food Recognition</h2>
                <p>
                  Snap a photo or upload one — FoodLens instantly identifies
                  ingredients, dishes, and nutrition info using AI-powered image
                  recognition.
                </p>
              </div>
              <div className="feature-item">
                <img src={lockImage} alt="Feature 2" />
                <h2>Privacy First</h2>
                <p>
                  All image processing happens securely, with user data protected by
                  end-to-end encryption.
                </p>
              </div>
              <div className="feature-item">
                <img src={brainImage} alt="Feature 3" />
                <h2>Ingredient Insights & Recipes</h2>
                <p>
                  Get detailed information on calories, nutrients, allergens, and
                  step-by-step cooking recipes for every recognized dish.
                </p>
              </div>
              <div className="feature-item">
                <img src={globeImage} alt="Feature 4" />
                <h2>Multi-Cuisine Support</h2>
                <p>
                  Recognizes foods from all over the world — from jollof rice to
                  ramen to tacos — with cultural accuracy.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Results View */
        <Results data={resultData} onReset={handleReset} />
      )}

      <hr />

      {/* About Section */}
      <section id="about" className="about">
        <h1 className="feature-text">About & Contact</h1>
        <div className="about-container">
          <p className="about-description">
            FoodLens is an AI-driven culinary companion designed to empower individuals with instant transparency into the foods they eat. Scan any dish to decode macronutrients, uncover allergens, and get authentic cooking recipes right at your fingertips.
          </p>
          <div className="about-links">
            <a
              href="https://github.com/GoodnewsCodes"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              GitHub Profile
            </a>
            <a href="mailto:contact@foodlens.app" className="about-link">
              Contact Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
