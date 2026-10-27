import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Button from "./components/Button/Button";
import Scanner from "./components/Scanner/Scanner";
import Results from "./components/Results/Results";
import MealJournal from "./components/MealJournal/MealJournal";
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
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [mealLog, setMealLog] = useState([]);
  const scannerRef = useRef(null);

  // Load saved meal log from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("foodlens_meal_log");
      if (saved) {
        setMealLog(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read meal log from localStorage:", e);
    }
  }, []);

  // Save meal log to localStorage whenever it changes
  const saveMealLog = (newLog) => {
    setMealLog(newLog);
    try {
      localStorage.setItem("foodlens_meal_log", JSON.stringify(newLog));
    } catch (e) {
      console.warn("Failed to persist meal log:", e);
    }
  };

  const handleLogMeal = (entry) => {
    const timeStr = new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    const newEntry = {
      ...entry,
      logId: Date.now() + Math.random().toString(36).substring(2, 6),
      time: timeStr,
    };
    saveMealLog([newEntry, ...mealLog]);
  };

  const handleRemoveMeal = (logId) => {
    saveMealLog(mealLog.filter((m) => m.logId !== logId));
  };

  const handleClearMealLog = () => {
    if (window.confirm("Are you sure you want to clear today's meal journal?")) {
      saveMealLog([]);
    }
  };

  const handleStartScan = () => {
    if (resultData) {
      setResultData(null);
    }
    setTimeout(() => {
      const el = document.getElementById("scanner");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  const handleNavigateHome = () => {
    setResultData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnalyze = async (imageInput, fileNameOrId) => {
    setIsAnalyzing(true);
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

  const handleSelectAlternate = (altDish) => {
    setResultData({
      ...altDish,
      userImage: resultData?.userImage || null,
      detectedAt: new Date().toISOString(),
      alternateMatches: (resultData?.alternateMatches || []).filter((f) => f.id !== altDish.id),
    });
  };

  const handleReset = () => {
    setResultData(null);
    setTimeout(() => {
      const el = document.getElementById("scanner");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <div className="app-root">
      <Navbar
        onStartScan={handleStartScan}
        onOpenJournal={() => setIsJournalOpen(true)}
        mealCount={mealLog.length}
        onNavigateHome={handleNavigateHome}
      />

      {/* Daily Meal Journal Modal */}
      <MealJournal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        mealLog={mealLog}
        onRemoveMeal={handleRemoveMeal}
        onClearLog={handleClearMealLog}
      />

      {!resultData ? (
        <>
          {/* Hero Section */}
          <section
            className="hero"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="hero-container">
              <h1 className="hero-text">
                Know More About Your Food In One Snap 📸
              </h1>
              <p className="hero-subtext">
                Instant dish recognition, full macronutrient & calorie breakdowns, allergen detection, and authentic step-by-step recipes.
              </p>

              <div className="hero-btn-group">
                <Button action="Scan Meal Now" onClick={handleStartScan} />
                <button
                  type="button"
                  className="hero-secondary-btn"
                  onClick={() => setIsJournalOpen(true)}
                >
                  View Today's Log ({mealLog.length})
                </button>
              </div>

              {/* Stats Bar */}
              <div className="hero-stats-row">
                <div className="hero-stat">
                  <strong>98%</strong>
                  <span>Recognition Accuracy</span>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <strong>1,000+</strong>
                  <span>Global Dishes</span>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <strong>Instant</strong>
                  <span>Macro Analytics</span>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Food Scanner */}
          <div ref={scannerRef}>
            <Scanner onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* Features Section */}
          <section id="features" className="feature">
            <div className="feature-container">
              <div className="feature-header">
                <h2 className="feature-text">Everything You Need To Master Nutrition</h2>
                <p className="feature-sub">Designed for mindful eaters, fitness athletes, home chefs, and culinary explorers.</p>
              </div>

              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon-wrap">
                    <img src={lensImage} alt="Smart Food Recognition" />
                  </div>
                  <h3>Smart Vision Recognition</h3>
                  <p>
                    Snap or drop any photo — FoodLens identifies dishes, ingredients, and portion weights with culinary AI models.
                  </p>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-wrap">
                    <img src={brainImage} alt="Nutrition Insights & Recipes" />
                  </div>
                  <h3>Macros & Authentic Recipes</h3>
                  <p>
                    Get instant breakdowns of calories, protein, carbs, healthy fats, micronutrients, plus chef cooking recipes.
                  </p>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-wrap">
                    <img src={globeImage} alt="Multi-Cuisine Support" />
                  </div>
                  <h3>Global Cuisine Diversity</h3>
                  <p>
                    From Nigerian Jollof rice to Japanese ramen, Mexican street tacos to Neapolitan pizza, celebrate authentic culinary diversity.
                  </p>
                </div>

                <div className="feature-item">
                  <div className="feature-icon-wrap">
                    <img src={lockImage} alt="Privacy First" />
                  </div>
                  <h3>Privacy & Local History</h3>
                  <p>
                    Your meal journal and photo analysis stay private in your browser, backed by fast client-side performance.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Results View */
        <Results
          data={resultData}
          onReset={handleReset}
          onLogMeal={handleLogMeal}
          onSelectAlternate={handleSelectAlternate}
        />
      )}

      {/* About & Contact Section */}
      <section id="about" className="about">
        <div className="about-container">
          <h2 className="about-title">Intelligent Culinary Transparency</h2>
          <p className="about-description">
            FoodLens is an AI culinary companion designed to empower individuals with instant transparency into the foods they eat. Scan any dish to decode macronutrients, uncover allergens, track daily goals, and get authentic cooking recipes right at your fingertips.
          </p>
          <div className="about-links">
            <a
              href="https://github.com/GoodnewsCodes"
              target="_blank"
              rel="noreferrer"
              className="about-link"
            >
              ⭐ GitHub Repository
            </a>
            <button
              type="button"
              className="about-link secondary"
              onClick={handleStartScan}
            >
              Try a Free Scan
            </button>
            <a href="mailto:contact@foodlens.app" className="about-link tertiary">
              ✉️ Contact Team
            </a>
          </div>
        </div>
      </section>

      <Footer onOpenJournal={() => setIsJournalOpen(true)} onStartScan={handleStartScan} />
    </div>
  );
}

export default App;
