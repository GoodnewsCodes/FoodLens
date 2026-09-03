export const FOOD_DATABASE = [
  {
    id: "jollof-rice",
    name: "Nigerian Jollof Rice",
    category: "West African",
    confidence: 96,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80",
    description: "Classic smoky West African rice cooked in a rich tomato, pepper, and onion reduction with aromatic herbs and spices.",
    servingSize: "1 plate (350g)",
    nutritionPerServing: {
      calories: 420,
      protein: 9,
      carbs: 68,
      fat: 12,
      fiber: 4,
      sugar: 5,
      sodium: 540,
    },
    allergens: ["None", "Gluten-Free"],
    dietaryTags: ["Halal", "Vegetarian-Option", "Dairy-Free"],
    recipe: {
      prepTime: "20 mins",
      cookTime: "45 mins",
      servings: 4,
      difficulty: "Medium",
      ingredients: [
        "3 cups Long-grain parboiled rice",
        "6 large fresh Roma tomatoes",
        "3 Red bell peppers (Tatashe)",
        "3 Scotch bonnet peppers (Atarodo)",
        "2 Medium onions (chopped)",
        "1/4 cup Tomato paste",
        "1/2 cup Vegetable oil",
        "2 cups Chicken or beef stock",
        "1 tbsp Thyme and Curry powder",
        "3 Bay leaves",
        "2 Bouillon seasoning cubes",
        "Salt to taste"
      ],
      instructions: [
        "Blend the tomatoes, red bell peppers, scotch bonnets, and 1 onion into a smooth puree. Boil down in a pot until excess water evaporates.",
        "Heat vegetable oil in a large pot, sauté the remaining chopped onions until translucent, then stir in tomato paste and fry for 5 minutes.",
        "Add the boiled pepper blend, thyme, curry powder, bay leaves, and bouillon cubes. Fry on medium heat until oil separates from the stew.",
        "Rinse the parboiled rice thoroughly and add to the pot, stirring well to coat with the pepper base.",
        "Pour in the meat stock (enough to barely cover the rice), cover tightly with foil and the lid to trap steam, and simmer on low heat for 30 minutes.",
        "Stir gently, allow the bottom to slightly char for that signature smoky party flavor, and serve hot."
      ]
    }
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast with Poached Egg",
    category: "Breakfast / Brunch",
    confidence: 94,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    description: "Crispy toasted artisan sourdough topped with creamy mashed avocado, perfectly poached eggs, red pepper flakes, and microgreens.",
    servingSize: "2 slices (220g)",
    nutritionPerServing: {
      calories: 360,
      protein: 15,
      carbs: 28,
      fat: 22,
      fiber: 8,
      sugar: 2,
      sodium: 380,
    },
    allergens: ["Eggs", "Wheat / Gluten"],
    dietaryTags: ["Vegetarian", "High Fiber", "Nutrient-Dense"],
    recipe: {
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: 1,
      difficulty: "Easy",
      ingredients: [
        "2 slices Whole grain sourdough bread",
        "1 Ripe Hass avocado",
        "2 Fresh eggs",
        "1 tbsp Fresh lemon juice",
        "1/2 tsp Chili flakes / Red pepper flakes",
        "1 tbsp Extra virgin olive oil",
        "Sea salt and freshly cracked black pepper",
        "Fresh microgreens or arugula for garnish"
      ],
      instructions: [
        "Toast the sourdough bread slices until golden brown and crispy.",
        "Cut and scoop the avocado into a small bowl. Add lemon juice, salt, pepper, and olive oil. Mash with a fork to your desired texture.",
        "Bring a small pot of water to a gentle simmer with 1 tsp white vinegar. Swirl water to create a vortex and gently drop in cracked eggs. Poach for 3 minutes until whites are set and yolks remain runny.",
        "Generously spread mashed avocado over the toasted bread.",
        "Top each slice with a warm poached egg, sprinkle with chili flakes, cracked black pepper, and fresh microgreens."
      ]
    }
  },
  {
    id: "grilled-salmon-bowl",
    name: "Grilled Salmon Quinoa Bowl",
    category: "Healthy / Seafood",
    confidence: 97,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    description: "Tender pan-seared salmon fillet over fluffy quinoa, roasted broccoli, avocado slices, and a light lemon tahini dressing.",
    servingSize: "1 bowl (380g)",
    nutritionPerServing: {
      calories: 540,
      protein: 38,
      carbs: 42,
      fat: 24,
      fiber: 7,
      sugar: 3,
      sodium: 410,
    },
    allergens: ["Fish (Salmon)", "Sesame"],
    dietaryTags: ["High Protein", "Gluten-Free", "Heart Healthy"],
    recipe: {
      prepTime: "15 mins",
      cookTime: "20 mins",
      servings: 2,
      difficulty: "Medium",
      ingredients: [
        "2 Salmon fillets (6 oz each, skin-on)",
        "1 cup Cooked quinoa",
        "1 cup Broccoli florets (steamed or roasted)",
        "1/2 Avocado (sliced)",
        "1 cup Cherry tomatoes (halved)",
        "1 tbsp Olive oil",
        "1 tbsp Lemon juice",
        "1 clove Garlic (minced)",
        "Salt, smoked paprika, and black pepper to taste"
      ],
      instructions: [
        "Season salmon fillets on both sides with olive oil, salt, black pepper, and smoked paprika.",
        "Heat a non-stick skillet over medium-high heat. Place salmon skin-side down and sear for 4-5 minutes until crispy. Flip and cook for another 3-4 minutes until cooked through.",
        "In serving bowls, create a base of warm cooked quinoa.",
        "Arrange roasted broccoli, sliced avocado, and halved cherry tomatoes alongside the quinoa.",
        "Place the seared salmon fillet on top, drizzle with fresh lemon juice and tahini or olive oil dressing, and serve immediately."
      ]
    }
  },
  {
    id: "tonkotsu-ramen",
    name: "Japanese Shoyu Ramen",
    category: "Asian / Noodles",
    confidence: 93,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    description: "Savory soy sauce broth with springy ramen noodles, soft-boiled ajitsuke egg, tender chashu pork, scallions, and nori seaweed.",
    servingSize: "1 large bowl (500g)",
    nutritionPerServing: {
      calories: 590,
      protein: 26,
      carbs: 72,
      fat: 22,
      fiber: 4,
      sugar: 6,
      sodium: 1250,
    },
    allergens: ["Soy", "Wheat / Gluten", "Eggs"],
    dietaryTags: ["High Energy", "Comfort Food"],
    recipe: {
      prepTime: "25 mins",
      cookTime: "30 mins",
      servings: 2,
      difficulty: "Medium",
      ingredients: [
        "2 portions Fresh or dried ramen noodles",
        "4 cups Rich chicken or dashi broth",
        "3 tbsp Soy sauce (Shoyu)",
        "1 tbsp Mirin",
        "1 tsp Sesame oil",
        "2 Marinated soft-boiled eggs (halved)",
        "4 slices Cooked Chashu pork or braised chicken",
        "2 sheets Nori seaweed",
        "1/4 cup Finely sliced scallions/green onions",
        "1/2 cup Bamboo shoots (Menma)"
      ],
      instructions: [
        "In a saucepan, combine chicken broth, soy sauce, mirin, minced garlic, and ginger. Simmer for 15 minutes to infuse flavours.",
        "In a separate pot of boiling water, cook ramen noodles according to package instructions (about 2-3 minutes). Drain thoroughly.",
        "Divide the hot tare broth between two deep ramen bowls.",
        "Carefully fold in the noodles, swirling them into the broth.",
        "Top each bowl with sliced pork, half an ajitsuke egg, bamboo shoots, green onions, and sheets of nori. Drizzle lightly with sesame oil."
      ]
    }
  },
  {
    id: "caesar-salad",
    name: "Classic Chicken Caesar Salad",
    category: "Salads / Greens",
    confidence: 95,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
    description: "Crisp romaine lettuce hearts tossed in creamy Caesar dressing, topped with sliced grilled chicken breast, shaved parmesan, and garlic croutons.",
    servingSize: "1 bowl (300g)",
    nutritionPerServing: {
      calories: 380,
      protein: 32,
      carbs: 14,
      fat: 22,
      fiber: 3,
      sugar: 3,
      sodium: 620,
    },
    allergens: ["Dairy (Parmesan)", "Eggs", "Fish (Anchovy in dressing)", "Wheat (Croutons)"],
    dietaryTags: ["High Protein", "Low Carb"],
    recipe: {
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: 2,
      difficulty: "Easy",
      ingredients: [
        "1 large head Romaine lettuce (chopped and chilled)",
        "2 Chicken breasts (boneless, skinless)",
        "1/3 cup Shaved Parmesan cheese",
        "1 cup Garlic herb croutons",
        "1/3 cup Caesar dressing",
        "1 tbsp Olive oil",
        "1 Lemon (cut into wedges)",
        "Salt and freshly ground black pepper"
      ],
      instructions: [
        "Rub chicken breasts with olive oil, salt, and black pepper. Grill or pan-sear for 6 minutes per side until internal temperature reaches 165°F (74°C). Let rest for 5 minutes, then slice.",
        "Wash, dry, and chop the romaine lettuce into bite-sized pieces.",
        "In a large wooden salad bowl, toss the lettuce with half of the Caesar dressing until leaves are coated.",
        "Add the sliced grilled chicken, garlic croutons, and shaved Parmesan cheese.",
        "Drizzle with remaining dressing, fresh cracked black pepper, and serve with lemon wedges."
      ]
    }
  },
  {
    id: "margherita-pizza",
    name: "Neapolitan Margherita Pizza",
    category: "Italian / Pizza",
    confidence: 98,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
    description: "Authentic wood-fired crust topped with San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, and extra virgin olive oil.",
    servingSize: "2 slices (240g)",
    nutritionPerServing: {
      calories: 480,
      protein: 20,
      carbs: 58,
      fat: 18,
      fiber: 3,
      sugar: 4,
      sodium: 780,
    },
    allergens: ["Wheat / Gluten", "Dairy (Mozzarella)"],
    dietaryTags: ["Vegetarian", "Classic Italian"],
    recipe: {
      prepTime: "20 mins",
      cookTime: "10 mins",
      servings: 3,
      difficulty: "Medium",
      ingredients: [
        "1 ball Fresh pizza dough (approx. 250g)",
        "1/2 cup San Marzano crushed tomatoes",
        "150g Fresh Mozzarella (Fior di latte), torn",
        "Handful of fresh basil leaves",
        "1 tbsp Extra virgin olive oil",
        "1/2 tsp Sea salt",
        "Semolina or flour for dusting"
      ],
      instructions: [
        "Preheat your oven with a pizza stone or baking steel to maximum temperature (500°F/260°C or higher).",
        "Stretch out the dough by hand on a lightly floured surface into a 12-inch round with a raised rim (cornicione).",
        "Ladle the seasoned crushed tomato sauce in a circular motion over the center, leaving the border bare.",
        "Evenly distribute pieces of torn fresh mozzarella over the sauce.",
        "Transfer pizza to the hot stone and bake for 7-9 minutes until crust is charred and cheese is bubbling.",
        "Remove from oven, top with fresh basil leaves, drizzle with extra virgin olive oil, slice, and enjoy."
      ]
    }
  },
  {
    id: "beef-tacos",
    name: "Street Style Beef Birria Tacos",
    category: "Mexican / Street Food",
    confidence: 96,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80",
    description: "Crispy corn tortillas filled with slow-cooked shredded beef, melted Oaxaca cheese, diced onions, cilantro, and served with rich dipping consommé.",
    servingSize: "3 tacos (320g)",
    nutritionPerServing: {
      calories: 520,
      protein: 34,
      carbs: 36,
      fat: 26,
      fiber: 5,
      sugar: 2,
      sodium: 820,
    },
    allergens: ["Dairy (Cheese)"],
    dietaryTags: ["High Protein", "Gluten-Free Tortillas"],
    recipe: {
      prepTime: "20 mins",
      cookTime: "40 mins",
      servings: 3,
      difficulty: "Medium",
      ingredients: [
        "6 Small corn tortillas",
        "350g Slow-cooked shredded beef (chuck roast or flank)",
        "1 cup Shredded Oaxaca or Monterey Jack cheese",
        "1/2 cup Diced white onion",
        "1/2 cup Fresh cilantro (chopped)",
        "1 cup Beef broth/birria consommé",
        "1 Lime (cut into wedges)",
        "1 tbsp Cooking oil"
      ],
      instructions: [
        "Heat a flat skillet (comal) or nonstick pan over medium heat.",
        "Dip each corn tortilla into the top layer of warm beef broth/consommé oil, then place on the hot skillet.",
        "Cover one half of each tortilla with shredded cheese and a generous portion of seasoned shredded beef.",
        "Fold the tortilla in half into a taco shape and fry for 2-3 minutes per side until crispy and golden brown.",
        "Open slightly to add diced white onions and chopped cilantro.",
        "Serve with lime wedges and a warm bowl of consommé for dipping."
      ]
    }
  }
];

export const DEFAULT_FALLBACK_FOOD = {
  name: "Chef's Balanced Meal",
  category: "Custom / Mixed Cuisine",
  confidence: 89,
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  description: "A nutritious, colorful combination of proteins, complex carbohydrates, fresh vegetables, and balanced healthy fats.",
  servingSize: "1 standard serving (320g)",
  nutritionPerServing: {
    calories: 450,
    protein: 24,
    carbs: 48,
    fat: 16,
    fiber: 6,
    sugar: 4,
    sodium: 490,
  },
  allergens: ["Check Ingredients"],
  dietaryTags: ["Balanced", "Whole Food"],
  recipe: {
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "1 cup Whole grains (rice, quinoa, or couscous)",
      "200g Lean protein of choice (chicken, tofu, or beans)",
      "2 cups Seasonal mixed vegetables (peppers, spinach, broccoli)",
      "1 tbsp Olive oil",
      "1 clove Garlic (minced)",
      "Aromatic herbs, salt, and black pepper to taste"
    ],
    instructions: [
      "Prepare your base of whole grains according to package instructions.",
      "Season lean protein with salt, pepper, garlic, and your favorite herbs. Pan-sear or grill until cooked through.",
      "Lightly sauté fresh vegetables in a drizzle of olive oil for 4-5 minutes until vibrant and tender-crisp.",
      "Assemble into a balanced plate with grains, protein, and sautéed greens.",
      "Drizzle with your favorite light dressing or fresh lemon juice."
    ]
  }
};
