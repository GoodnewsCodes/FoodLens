import { useState } from "react";
import "./Results.css";

function Results({ data, onReset }) {
  const [portion, setPortion] = useState(1);
  const [activeTab, setActiveTab] = useState("nutrition"); // 'nutrition' or 'recipe'

  if (!data) return null;

  const {
    name,
    category,
    confidence,
    image,
    userImage,
    description,
    servingSize,
    nutritionPerServing,
    allergens = [],
    dietaryTags = [],
    recipe,
  } = data;

  const displayImage = userImage || image;

  // Scale nutrition based on portion multiplier
  const scaledNutrition = {
    calories: Math.round(nutritionPerServing.calories * portion),
    protein: Math.round(nutritionPerServing.protein * portion),
    carbs: Math.round(nutritionPerServing.carbs * portion),
    fat: Math.round(nutritionPerServing.fat * portion),
    fiber: Math.round(nutritionPerServing.fiber * portion),
    sugar: Math.round(nutritionPerServing.sugar * portion),
    sodium: Math.round(nutritionPerServing.sodium * portion),
  };

  return (
    <section id="results" className="results-section">
      <div className="results-container">
        {/* Top Action Bar */}
        <div className="results-top-bar">
          <button className="back-btn" onClick={onReset}>
            ← Scan Another Meal
          </button>
          <div className="confidence-badge">
            <span className="confidence-dot"></span>
            {confidence}% AI Confidence
          </div>
        </div>

        {/* Main Header Card */}
        <div className="food-hero-card">
          <div className="food-image-wrapper">
            <img src={displayImage} alt={name} className="food-display-img" />
          </div>
          <div className="food-info-wrapper">
            <div className="category-pill">{category}</div>
            <h1 className="food-title">{name}</h1>
            <p className="food-description">{description}</p>

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

            {/* Serving Size & Portion Multiplier */}
            <div className="portion-control">
              <span className="portion-label">
                Portion Size ({servingSize}):
              </span>
              <div className="portion-buttons">
                {[0.5, 1, 1.5, 2].map((factor) => (
                  <button
                    key={factor}
                    className={`portion-btn ${portion === factor ? "active" : ""}`}
                    onClick={() => setPortion(factor)}
                  >
                    {factor}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs between Nutrition and Recipe */}
        <div className="results-tabs">
          <button
            className={`tab-btn ${activeTab === "nutrition" ? "active" : ""}`}
            onClick={() => setActiveTab("nutrition")}
          >
            📊 Nutrition Facts
          </button>
          <button
            className={`tab-btn ${activeTab === "recipe" ? "active" : ""}`}
            onClick={() => setActiveTab("recipe")}
          >
            👨‍🍳 Step-by-Step Recipe
          </button>
        </div>

        {/* Tab 1: Nutrition Breakdown */}
        {activeTab === "nutrition" && (
          <div className="nutrition-tab-content">
            {/* Quick Macro Cards */}
            <div className="macro-cards-grid">
              <div className="macro-card calories">
                <span className="macro-value">{scaledNutrition.calories}</span>
                <span className="macro-label">Calories (kcal)</span>
              </div>
              <div className="macro-card protein">
                <span className="macro-value">{scaledNutrition.protein}g</span>
                <span className="macro-label">Protein</span>
              </div>
              <div className="macro-card carbs">
                <span className="macro-value">{scaledNutrition.carbs}g</span>
                <span className="macro-label">Carbs</span>
              </div>
              <div className="macro-card fat">
                <span className="macro-value">{scaledNutrition.fat}g</span>
                <span className="macro-label">Total Fat</span>
              </div>
            </div>

            {/* Detailed Nutrition Table */}
            <div className="detailed-nutrition-card">
              <h3 className="section-title">Detailed Nutrient Breakdown</h3>
              <div className="nutrient-row">
                <span>Dietary Fiber</span>
                <strong>{scaledNutrition.fiber} g</strong>
              </div>
              <div className="nutrient-row">
                <span>Sugars</span>
                <strong>{scaledNutrition.sugar} g</strong>
              </div>
              <div className="nutrient-row">
                <span>Sodium</span>
                <strong>{scaledNutrition.sodium} mg</strong>
              </div>
              <div className="nutrient-row">
                <span>Estimated Serving Weight</span>
                <strong>{Math.round(300 * portion)} g</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Step-by-Step Recipe */}
        {activeTab === "recipe" && recipe && (
          <div className="recipe-tab-content">
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
                  <span className="meta-val">{recipe.servings} portions</span>
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

            <div className="recipe-details-grid">
              {/* Ingredients List */}
              <div className="ingredients-card">
                <h3 className="section-title">Ingredients</h3>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="ingredient-item">
                      <span className="bullet">✓</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="instructions-card">
                <h3 className="section-title">Cooking Instructions</h3>
                <ol className="instructions-list">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="instruction-step">
                      <span className="step-number">{i + 1}</span>
                      <p className="step-text">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="results-bottom-cta">
          <button className="reset-scan-btn" onClick={onReset}>
            📸 Scan Another Meal
          </button>
        </div>
      </div>
    </section>
  );
}

export default Results;
