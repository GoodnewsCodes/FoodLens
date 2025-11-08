# 🍴 FoodLens

FoodLens is an AI-powered web prototype that allows users to _upload or capture pictures of food_ and automatically identifies the dish, providing key _nutritional details_ such as calories, protein, fat, and carbohydrates.

---

## 🚀 Features

- 📸 _Image Upload_ – Upload a photo of any meal using your device camera or gallery.
- 🧠 _AI Food Recognition_ – Uses pre-trained APIs (Clarifai / Google Vision / Edamam) to identify the food in the image.
- 📊 _Nutrition Insights_ – Fetches detailed nutrition facts (calories, macronutrients, etc.) using APIs like Edamam or Spoonacular.
- 💻 _Responsive UI_ – Clean, modern React interface that adapts to both desktop and mobile screens.
- 🧾 _Confidence Scoring_ – Displays prediction confidence levels for transparency.
- 🔁 _Retake / Reupload Option_ – Allows users to scan another meal easily.

---

## 🧩 Tech Stack

| Category         | Tools / Libraries                                              |
| ---------------- | -------------------------------------------------------------- |
| _Frontend_       | React (Vite)                                                   |
| _Styling_        | Plain CSS (no Tailwind, no UI frameworks)                      |
| _AI Recognition_ | Clarifai API / Google Cloud Vision API / Edamam Food Image API |
| _Nutrition Data_ | Edamam Nutrition API / Spoonacular API                         |
| _Routing_        | React Router DOM                                               |

---

## 🏗 Project Structure

```
foodlens/
│
├── src/
│ ├── components/
│ │ ├── Home.jsx
│ │ ├── Home.css
│ │ ├── Results.jsx
│ │ └── Results.css
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── public/
│ └── favicon.ico
│
├── package.json
└── README.md
```

## ⚙️ Setup & Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/foodlens.git
   cd foodlens
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start development server

   ```
   npm run dev
   ```

4. Open in browser

   ```
   http://localhost:5173
   ```

## 🔑 Environment Variables

Create a .env file in the root directory and add your API keys:

```
VITE_CLARIFAI_API_KEY=your_clarifai_api_key
VITE_EDAMAM_APP_ID=your_edamam_app_id
VITE_EDAMAM_APP_KEY=your_edamam_app_key
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
```

⚠️ Never expose your API keys in frontend code for production. Use a backend proxy or environment protection for deployment.

## 🧠 How It Works

- User uploads a food image.

- Image is sent to the selected food recognition API.

- API returns predicted food name(s) with confidence scores.

- App fetches nutrition data using the food name.

- UI displays name, confidence, and nutrition breakdown.

## 🎨 UI Design Principles

- Minimalist light theme (white background).

- Orange accent color (#8B5CF6).

- Rounded corners & subtle shadows.

- Clean layout with natural spacing and no framework “AI-template” feel.

- Responsive and accessible design.

## 📅 Future Enhancements

- 🍽️ Support multiple foods in one image.

- 📱 Build cross-platform version in React Native.

- 🗄️ Add user history of scanned meals.

- 🌐 Multi-language support.

- 🤖 Switch from pre-trained API to custom TensorFlow.js model.

## 📜 License

This project is open-source under the MIT License.
Feel free to fork, improve, and build upon FoodLens.

## 👨‍💻 Author

### Goodnews Anwana

#### Software Developer & AI Enthusiast

🔗 [GitHub](https://github.com/GoodnewsCodes)
