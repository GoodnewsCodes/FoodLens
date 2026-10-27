import { FOOD_DATABASE, DEFAULT_FALLBACK_FOOD } from "./foodData";

/**
 * Recognizes food from an image (File or Data URL) or sample ID.
 * Supports smart local matching, filename analysis, sample presets,
 * and handles graceful fallbacks and alternate suggestions.
 */
export async function recognizeFoodImage(input, identifier = "") {
  // If sample ID is provided directly
  if (typeof identifier === "string" && identifier) {
    const directMatch = FOOD_DATABASE.find(
      (f) => f.id === identifier || f.name.toLowerCase() === identifier.toLowerCase()
    );
    if (directMatch) {
      // Simulate brief inference delay
      await new Promise((resolve) => setTimeout(resolve, 900));
      return formatResult(directMatch, input);
    }
  }

  // Artificial AI processing delay to simulate neural network inference
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const cleanIdentifier = String(identifier || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ");

  // 1. Search database by keywords & aliases
  let foundFood = null;
  const searchTokens = cleanIdentifier.split(/\s+/).filter((t) => t.length > 2);

  if (searchTokens.length > 0) {
    foundFood = FOOD_DATABASE.find((food) => {
      const allText = [
        food.id,
        food.name.toLowerCase(),
        food.category.toLowerCase(),
        ...(food.aliases || []),
        ...(food.dietaryTags || []).map((t) => t.toLowerCase()),
      ].join(" ");

      return searchTokens.some((token) => allText.includes(token));
    });
  }

  // 2. If input is a URL from an existing dish image
  if (!foundFood && typeof input === "string" && input.startsWith("http")) {
    foundFood = FOOD_DATABASE.find((food) => food.image === input);
  }

  // 3. If no specific match from filename, pick a signature dish
  if (!foundFood) {
    // Pick based on a hash of the input string or random for demo
    const index = Math.abs(hashCode(String(identifier || input || "dish"))) % FOOD_DATABASE.length;
    foundFood = FOOD_DATABASE[index] || DEFAULT_FALLBACK_FOOD;
  }

  return formatResult(foundFood, input);
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function formatResult(food, input) {
  // Compute alternative dishes excluding the selected one
  const alternateMatches = FOOD_DATABASE.filter((f) => f.id !== food.id).slice(0, 4);

  return {
    ...food,
    userImage: typeof input === "string" ? input : null,
    detectedAt: new Date().toISOString(),
    alternateMatches,
  };
}
