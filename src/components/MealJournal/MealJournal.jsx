import { useState } from "react";
import "./MealJournal.css";

function MealJournal({ isOpen, onClose, mealLog = [], onRemoveMeal, onClearLog }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const DAILY_CALORIE_GOAL = 2000;

  // Calculate totals
  const totals = mealLog.reduce(
    (acc, item) => {
      acc.calories += item.calories || 0;
      acc.protein += item.protein || 0;
      acc.carbs += item.carbs || 0;
      acc.fat += item.fat || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const caloriePct = Math.min(Math.round((totals.calories / DAILY_CALORIE_GOAL) * 100), 100);

  const handleCopySummary = () => {
    if (mealLog.length === 0) return;
    const dateStr = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    const lines = [
      `🥗 FoodLens Daily Journal (${dateStr})`,
      `🔥 Total Calories: ${totals.calories} / ${DAILY_CALORIE_GOAL} kcal (${caloriePct}%)`,
      `💪 Protein: ${totals.protein}g | 🍞 Carbs: ${totals.carbs}g | 🥑 Fat: ${totals.fat}g`,
      "",
      "Logged Meals:",
      ...mealLog.map(
        (m, i) =>
          `${i + 1}. ${m.name} (${m.portion}x) - ${m.calories} kcal (${m.time || "Today"})`
      ),
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="journal-overlay" onClick={onClose}>
      <div className="journal-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="journal-header">
          <div className="journal-title-box">
            <span className="journal-icon">🍽️</span>
            <div>
              <h2 className="journal-title">Daily Nutrition Journal</h2>
              <p className="journal-subtitle">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <button className="journal-close-btn" onClick={onClose} aria-label="Close Journal">
            ✕
          </button>
        </div>

        {/* Daily Summary Card */}
        <div className="journal-summary-card">
          <div className="summary-calorie-row">
            <div>
              <span className="summary-label">Calories Today</span>
              <div className="summary-val-wrap">
                <span className="summary-cal-val">{totals.calories}</span>
                <span className="summary-cal-goal">/ {DAILY_CALORIE_GOAL} kcal</span>
              </div>
            </div>
            <div className="summary-badge">{caloriePct}% of Daily Goal</div>
          </div>

          {/* Progress bar */}
          <div className="calorie-progress-track">
            <div
              className="calorie-progress-fill"
              style={{ width: `${caloriePct}%` }}
            ></div>
          </div>

          {/* Macro breakdown chips */}
          <div className="journal-macros-grid">
            <div className="journal-macro-box protein">
              <span className="macro-chip-label">Protein</span>
              <span className="macro-chip-val">{totals.protein}g</span>
            </div>
            <div className="journal-macro-box carbs">
              <span className="macro-chip-label">Carbs</span>
              <span className="macro-chip-val">{totals.carbs}g</span>
            </div>
            <div className="journal-macro-box fat">
              <span className="macro-chip-label">Fat</span>
              <span className="macro-chip-val">{totals.fat}g</span>
            </div>
          </div>
        </div>

        {/* Meal Log List */}
        <div className="journal-list-section">
          <div className="journal-list-header">
            <h3>Logged Meals ({mealLog.length})</h3>
            {mealLog.length > 0 && (
              <button className="copy-summary-btn" onClick={handleCopySummary}>
                {copied ? "✓ Copied!" : "📋 Copy Summary"}
              </button>
            )}
          </div>

          {mealLog.length === 0 ? (
            <div className="journal-empty">
              <span className="empty-icon">🥗</span>
              <h4>No meals logged yet today</h4>
              <p>Snap or upload a photo of your food and click "Log to Daily Tracker" to start tracking!</p>
            </div>
          ) : (
            <div className="journal-items">
              {mealLog.map((meal) => (
                <div key={meal.logId} className="journal-item">
                  <img src={meal.image} alt={meal.name} className="journal-item-img" />
                  <div className="journal-item-info">
                    <div className="journal-item-row">
                      <span className="journal-item-name">{meal.name}</span>
                      <span className="journal-item-cal">{meal.calories} kcal</span>
                    </div>
                    <div className="journal-item-sub">
                      <span>Portion: {meal.portion}x</span>
                      <span>•</span>
                      <span>P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g</span>
                      <span>•</span>
                      <span className="journal-time">{meal.time}</span>
                    </div>
                  </div>
                  <button
                    className="journal-remove-btn"
                    title="Remove item"
                    onClick={() => onRemoveMeal(meal.logId)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {mealLog.length > 0 && (
          <div className="journal-footer">
            <button className="clear-log-btn" onClick={onClearLog}>
              Clear Today's Log
            </button>
            <button className="journal-done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealJournal;
