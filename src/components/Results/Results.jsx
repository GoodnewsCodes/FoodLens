import { useState, useEffect } from "react";
import { FOOD_DATABASE } from "../../services/foodData";
import "./Results.css";

function Results({ data, onReset, onLogMeal, onSelectAlternate }) {
  const [portion, setPortion] = useState(1);
  const [activeTab, setActiveTab] = useState("nutrition"); // 'nutrition' | 'recipe' | 'facts'
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [recipeServingsMultiplier, setRecipeServingsMultiplier] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);

  // Kitchen Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((sec) => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      showToast("⏰ Kitchen Timer Finished!");
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  if (!data) return null;

  const {
    id,
    name,
    category,
    confidence = 95,
    image,
    userImage,
    description,
    servingSize,
    servingWeightGrams = 320,
    nutritionPerServing = {},
    allergens = [],
    dietaryTags = [],
    healthBenefits = [],
    recipe,
    alternateMatches = [],
  } = data;

  const displayImage = userImage || image;

  // Scaled Nutrition
  const scaledNutrition = {
    calories: Math.round((nutritionPerServing.calories || 0) * portion),
    protein: Math.round((nutritionPerServing.protein || 0) * portion),
    carbs: Math.round((nutritionPerServing.carbs || 0) * portion),
    fat: Math.round((nutritionPerServing.fat || 0) * portion),
    fiber: Math.round((nutritionPerServing.fiber || 0) * portion),
    sugar: Math.round((nutritionPerServing.sugar || 0) * portion),
    sodium: Math.round((nutritionPerServing.sodium || 0) * portion),
    potassium: Math.round((nutritionPerServing.potassium || 400) * portion),
    calcium: Math.round((nutritionPerServing.calcium || 80) * portion),
    iron: Number(((nutritionPerServing.iron || 2.5) * portion).toFixed(1)),
    vitaminC: Math.round((nutritionPerServing.vitaminC || 15) * portion),
    weightGrams: Math.round(servingWeightGrams * portion),
  };

  // Macro Energy Distribution
  const proteinCals = scaledNutrition.protein * 4;
  const carbsCals = scaledNutrition.carbs * 4;
  const fatCals = scaledNutrition.fat * 9;
  const totalMacroCals = proteinCals + carbsCals + fatCals || 1;
  const proteinPct = Math.round((proteinCals / totalMacroCals) * 100);
  const carbsPct = Math.round((carbsCals / totalMacroCals) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  // Daily Value reference (2,000 kcal diet)
  const dv = {
    calories: Math.round((scaledNutrition.calories / 2000) * 100),
    protein: Math.round((scaledNutrition.protein / 50) * 100),
    carbs: Math.round((scaledNutrition.carbs / 275) * 100),
    fat: Math.round((scaledNutrition.fat / 78) * 100),
    fiber: Math.round((scaledNutrition.fiber / 28) * 100),
    sodium: Math.round((scaledNutrition.sodium / 2300) * 100),
    potassium: Math.round((scaledNutrition.potassium / 4700) * 100),
    calcium: Math.round((scaledNutrition.calcium / 1300) * 100),
    iron: Math.round((scaledNutrition.iron / 18) * 100),
    vitaminC: Math.round((scaledNutrition.vitaminC / 90) * 100),
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Log to meal journal
  const handleLogClick = () => {
    if (onLogMeal) {
      onLogMeal({
        dishId: id,
        name,
        portion,
        image: displayImage,
        calories: scaledNutrition.calories,
        protein: scaledNutrition.protein,
        carbs: scaledNutrition.carbs,
        fat: scaledNutrition.fat,
      });
      showToast(`✓ Logged ${name} (${scaledNutrition.calories} kcal) to Journal!`);
    }
  };

  // Copy Nutrition to Clipboard
  const handleCopyNutrition = () => {
    const text = [
      `🥗 FoodLens Nutrition: ${name} (${portion}x portion, ~${scaledNutrition.weightGrams}g)`,
      `🔥 Calories: ${scaledNutrition.calories} kcal (${dv.calories}% DV)`,
      `💪 Protein: ${scaledNutrition.protein}g (${proteinPct}% macro energy)`,
      `🍞 Carbs: ${scaledNutrition.carbs}g (${carbsPct}% macro energy)`,
      `🥑 Fat: ${scaledNutrition.fat}g (${fatPct}% macro energy)`,
      `🌾 Fiber: ${scaledNutrition.fiber}g | 🧂 Sodium: ${scaledNutrition.sodium}mg`,
      allergens.length > 0 ? `⚠️ Allergens: ${allergens.join(", ")}` : "Allergens: None",
      `Analyzed with FoodLens AI: https://goodnewscodes.github.io/FoodLens`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    showToast("📋 Copied Nutrition Facts to clipboard!");
  };

  // Toggle Ingredient Check
  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Toggle Recipe Step Completion
  const toggleStep = (idx) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Timer helpers
  const startTimer = (minutes) => {
    setTimerSeconds(minutes * 60);
    setTimerActive(true);
    showToast(`⏱️ Started ${minutes}m Kitchen Timer!`);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section id="results" className="results-section">
      <div className="results-container">
        {/* Toast Notification */}
        {toastMessage && <div className="results-toast">{toastMessage}</div>}

        {/* Top Navigation & Action Bar */}
        <div className="results-top-bar">
          <button className="back-btn" onClick={onReset}>
            <span className="arrow">←</span> Scan Another Meal
          </button>

          <div className="top-bar-right-actions">
            <button className="quick-action-btn" onClick={handleCopyNutrition} title="Copy Nutrition Summary">
              📋 Share
            </button>
            <button className="quick-action-btn primary" onClick={handleLogClick} title="Add to Daily Tracker">
              ➕ Log to Tracker
            </button>
            <div className="confidence-badge">
              <span className="confidence-dot"></span>
              {confidence}% Confidence
            </div>
          </div>
        </div>

        {/* Alternative matches if user thinks recognition is off */}
        {alternateMatches.length > 0 && (
          <div className="alternate-bar">
            <span className="alternate-label">Not your dish? Switch to:</span>
            <div className="alternate-pills">
              {alternateMatches.map((alt) => (
                <button
                  key={alt.id}
                  className="alternate-pill"
                  onClick={() => onSelectAlternate && onSelectAlternate(alt)}
                >
                  <img src={alt.image} alt={alt.name} className="alt-thumb" />
                  <span>{alt.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hero Food Card */}
        <div className="food-hero-card">
          <div className="food-image-wrapper" onClick={() => setShowImageModal(true)} title="Click to view full image">
            <img src={displayImage} alt={name} className="food-display-img" />
            <span className="zoom-hint">🔍 Expand</span>
            {userImage && <span className="photo-badge">📸 Scanned Photo</span>}
          </div>

          <div className="food-info-wrapper">
            <div className="category-pill">{category}</div>
            <h1 className="food-title">{name}</h1>
            <p className="food-description">{description}</p>

            {/* Health Highlights */}
            {healthBenefits.length > 0 && (
              <div className="health-benefits-row">
                {healthBenefits.map((b, i) => (
                  <span key={i} className="benefit-pill">
                    ✨ {b}
                  </span>
                ))}
              </div>
            )}

            {/* Dietary Tags & Allergens */}
            <div className="tags-container">
              {dietaryTags.map((tag, i) => (
                <span key={i} className="dietary-tag">
                  🌱 {tag}
                </span>
              ))}
              {allergens.length > 0 && (
                <span className="allergen-tag">
                  ⚠️ Contains: {allergens.join(", ")}
                </span>
              )}
            </div>

            {/* Portion Size Controller */}
            <div className="portion-control-card">
              <div className="portion-control-header">
                <span className="portion-label">
                  Portion Multiplier: <strong>{portion}x</strong> (~{scaledNutrition.weightGrams}g)
                </span>
                <span className="base-serving">Base: {servingSize}</span>
              </div>
              <div className="portion-buttons-row">
                {[0.5, 1, 1.5, 2].map((factor) => (
                  <button
                    key={factor}
                    className={`portion-btn ${portion === factor ? "active" : ""}`}
                    onClick={() => setPortion(factor)}
                  >
                    {factor}x
                  </button>
                ))}
                <div className="portion-stepper">
                  <button
                    className="step-btn"
                    onClick={() => setPortion((p) => Math.max(0.25, Number((p - 0.25).toFixed(2))))}
                    title="Decrease portion"
                  >
                    −
                  </button>
                  <span className="step-val">{portion}x</span>
                  <button
                    className="step-btn"
                    onClick={() => setPortion((p) => Math.min(4, Number((p + 0.25).toFixed(2))))}
                    title="Increase portion"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Image Modal */}
        {showImageModal && (
          <div className="image-zoom-overlay" onClick={() => setShowImageModal(false)}>
            <div className="image-zoom-modal" onClick={(e) => e.stopPropagation()}>
              <img src={displayImage} alt={name} className="image-zoom-full" />
              <button className="image-zoom-close" onClick={() => setShowImageModal(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="results-tabs">
          <button
            className={`tab-btn ${activeTab === "nutrition" ? "active" : ""}`}
            onClick={() => setActiveTab("nutrition")}
          >
            📊 Nutrition & Macros
          </button>
          <button
            className={`tab-btn ${activeTab === "recipe" ? "active" : ""}`}
            onClick={() => setActiveTab("recipe")}
          >
            👨‍🍳 Step-by-Step Recipe
          </button>
        </div>

        {/* Tab 1: Nutrition & Macros */}
        {activeTab === "nutrition" && (
          <div className="nutrition-tab-content">
            {/* Quick Macro Cards */}
            <div className="macro-cards-grid">
              <div className="macro-card calories">
                <span className="macro-icon">🔥</span>
                <span className="macro-value">{scaledNutrition.calories}</span>
                <span className="macro-label">Calories (kcal)</span>
                <span className="macro-dv">{dv.calories}% Daily Value</span>
              </div>
              <div className="macro-card protein">
                <span className="macro-icon">💪</span>
                <span className="macro-value">{scaledNutrition.protein}g</span>
                <span className="macro-label">Protein</span>
                <span className="macro-dv">{dv.protein}% Daily Value</span>
              </div>
              <div className="macro-card carbs">
                <span className="macro-icon">🍞</span>
                <span className="macro-value">{scaledNutrition.carbs}g</span>
                <span className="macro-label">Carbohydrates</span>
                <span className="macro-dv">{dv.carbs}% Daily Value</span>
              </div>
              <div className="macro-card fat">
                <span className="macro-icon">🥑</span>
                <span className="macro-value">{scaledNutrition.fat}g</span>
                <span className="macro-label">Total Fat</span>
                <span className="macro-dv">{dv.fat}% Daily Value</span>
              </div>
            </div>

            {/* Macro Energy Distribution Stacked Bar */}
            <div className="macro-distribution-card">
              <div className="distribution-header">
                <h4>Energy Breakdown (% of Total Calories)</h4>
                <span className="distribution-total">
                  {scaledNutrition.calories} kcal total
                </span>
              </div>

              <div className="stacked-bar-track">
                <div
                  className="stacked-bar-fill protein"
                  style={{ width: `${proteinPct}%` }}
                  title={`Protein: ${proteinPct}% (${proteinCals} kcal)`}
                ></div>
                <div
                  className="stacked-bar-fill carbs"
                  style={{ width: `${carbsPct}%` }}
                  title={`Carbs: ${carbsPct}% (${carbsCals} kcal)`}
                ></div>
                <div
                  className="stacked-bar-fill fat"
                  style={{ width: `${fatPct}%` }}
                  title={`Fat: ${fatPct}% (${fatCals} kcal)`}
                ></div>
              </div>

              <div className="distribution-legend">
                <div className="legend-item">
                  <span className="legend-color protein"></span>
                  <span>Protein: <strong>{proteinPct}%</strong> ({proteinCals} kcal)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color carbs"></span>
                  <span>Carbs: <strong>{carbsPct}%</strong> ({carbsCals} kcal)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color fat"></span>
                  <span>Fat: <strong>{fatPct}%</strong> ({fatCals} kcal)</span>
                </div>
              </div>
            </div>

            {/* Detailed Nutrient Breakdown with DV Progress Bars */}
            <div className="detailed-nutrition-card">
              <h3 className="section-title">Micronutrient & Dietary Profile</h3>
              <p className="nutrient-subtitle">Percent Daily Values (% DV) are based on a standard 2,000 calorie diet.</p>

              <div className="nutrients-list">
                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Dietary Fiber</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.fiber}g</strong> ({dv.fiber}% DV)
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill" style={{ width: `${Math.min(dv.fiber, 100)}%` }}></div>
                  </div>
                </div>

                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Sugars</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.sugar}g</strong>
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill sugar" style={{ width: `${Math.min((scaledNutrition.sugar / 50) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Sodium</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.sodium}mg</strong> ({dv.sodium}% DV)
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill sodium" style={{ width: `${Math.min(dv.sodium, 100)}%` }}></div>
                  </div>
                </div>

                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Potassium</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.potassium}mg</strong> ({dv.potassium}% DV)
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill" style={{ width: `${Math.min(dv.potassium, 100)}%` }}></div>
                  </div>
                </div>

                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Calcium</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.calcium}mg</strong> ({dv.calcium}% DV)
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill" style={{ width: `${Math.min(dv.calcium, 100)}%` }}></div>
                  </div>
                </div>

                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Iron</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.iron}mg</strong> ({dv.iron}% DV)
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill" style={{ width: `${Math.min(dv.iron, 100)}%` }}></div>
                  </div>
                </div>

                <div className="nutrient-item">
                  <div className="nutrient-info-row">
                    <span className="nutrient-name">Vitamin C</span>
                    <span className="nutrient-amount">
                      <strong>{scaledNutrition.vitaminC}mg</strong> ({dv.vitaminC}% DV)
                    </span>
                  </div>
                  <div className="nutrient-meter-track">
                    <div className="nutrient-meter-fill" style={{ width: `${Math.min(dv.vitaminC, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Step-by-Step Recipe */}
        {activeTab === "recipe" && recipe && (
          <div className="recipe-tab-content">
            {/* Recipe Meta Banner */}
            <div className="recipe-meta-card">
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <div>
                  <span className="meta-title">Prep Time</span>
                  <span className="meta-val">{recipe.prepTime}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🍳</span>
                <div>
                  <span className="meta-title">Cook Time</span>
                  <span className="meta-val">{recipe.cookTime}</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👥</span>
                <div>
                  <span className="meta-title">Servings</span>
                  <span className="meta-val">{recipe.servings * recipeServingsMultiplier} portions</span>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⭐</span>
                <div>
                  <span className="meta-title">Difficulty</span>
                  <span className="meta-val">{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Kitchen Timer Tool */}
            <div className="kitchen-timer-card">
              <div className="timer-header">
                <span className="timer-icon">⏰</span>
                <div>
                  <h4>Interactive Cooking Timer</h4>
                  <p>Preset quick countdowns while you prepare this dish</p>
                </div>
              </div>

              <div className="timer-display-wrap">
                <div className={`timer-clock ${timerActive ? "active" : ""}`}>
                  {formatTimer(timerSeconds)}
                </div>
                <div className="timer-presets">
                  {[1, 5, 15, 30].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className="timer-preset-btn"
                      onClick={() => startTimer(m)}
                    >
                      {m} min
                    </button>
                  ))}
                  {timerActive ? (
                    <button
                      type="button"
                      className="timer-control-btn pause"
                      onClick={() => setTimerActive(false)}
                    >
                      Pause
                    </button>
                  ) : timerSeconds > 0 ? (
                    <button
                      type="button"
                      className="timer-control-btn resume"
                      onClick={() => setTimerActive(true)}
                    >
                      Resume
                    </button>
                  ) : null}
                  {timerSeconds > 0 && (
                    <button
                      type="button"
                      className="timer-control-btn reset"
                      onClick={() => {
                        setTimerSeconds(0);
                        setTimerActive(false);
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="recipe-details-grid">
              {/* Ingredients Checklist */}
              <div className="ingredients-card">
                <div className="card-header-row">
                  <h3 className="section-title">Ingredients Checklist</h3>
                  <div className="servings-scale-pills">
                    {[1, 2].map((mult) => (
                      <button
                        key={mult}
                        className={`scale-pill ${recipeServingsMultiplier === mult ? "active" : ""}`}
                        onClick={() => setRecipeServingsMultiplier(mult)}
                      >
                        {mult}x
                      </button>
                    ))}
                  </div>
                </div>
                <p className="ingredients-hint">Tap any ingredient to cross it off as prepared:</p>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className={`ingredient-item ${checkedIngredients[i] ? "checked" : ""}`}
                      onClick={() => toggleIngredient(i)}
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedIngredients[i]}
                        readOnly
                        className="ingredient-checkbox"
                      />
                      <span className="ingredient-name">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="instructions-card">
                <div className="card-header-row">
                  <h3 className="section-title">Cooking Method</h3>
                  <button
                    className="print-recipe-btn"
                    onClick={() => window.print()}
                    title="Print recipe"
                  >
                    🖨️ Print Recipe
                  </button>
                </div>
                <ol className="instructions-list">
                  {recipe.instructions.map((step, i) => (
                    <li
                      key={i}
                      className={`instruction-step ${completedSteps[i] ? "step-done" : ""}`}
                      onClick={() => toggleStep(i)}
                    >
                      <div className="step-number-wrap">
                        <span className="step-number">{completedSteps[i] ? "✓" : i + 1}</span>
                      </div>
                      <div className="step-content">
                        <p className="step-text">{step}</p>
                        <span className="step-tap-hint">
                          {completedSteps[i] ? "Completed" : "Tap when step is complete"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA & Floating Journal Option */}
        <div className="results-bottom-cta">
          <button className="reset-scan-btn secondary" onClick={onReset}>
            📸 Scan Another Meal
          </button>
          <button className="reset-scan-btn primary" onClick={handleLogClick}>
            ➕ Log to Today's Journal
          </button>
        </div>
      </div>
    </section>
  );
}

export default Results;
