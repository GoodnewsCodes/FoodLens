import Navbar from "./components/Navbar/Navbar";
import Button from "./components/Button/Button";
import heroImage from "./assets/hero.jpg";
import lensImage from "./assets/lens.png";
import lockImage from "./assets/lock.png";
import brainImage from "./assets/brain.png";
import globeImage from "./assets/globe.png";
import "./App.css";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-container">
          <h1 className="hero-text">Know more about your food in one Snap📸</h1>
          <Button
            action="Get Started
              "
            onClick={() => {}}
          />
        </div>
      </section>

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
            <h2>Ingredient Insights</h2>
            <p>
              Get detailed information on calories, nutrients, and possible
              allergens — perfect for health-conscious users or meal planners.
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
      <hr />

      <section className="about">
        <h1 className="feature-text">About & Contact</h1>
        <div className="about-container">
          <div className="social-links"></div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
}

export default App;
