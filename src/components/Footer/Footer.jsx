import logoImage from "../../assets/logo.png";
import "./Footer.css";

function Footer({ onOpenJournal, onStartScan }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <img src={logoImage} alt="FoodLens Logo" height={32} width={32} />
            <span className="footer-logo-text">FoodLens</span>
            <span className="footer-pill">v2.0</span>
          </div>
          <p className="footer-tagline">
            Instant AI food identification, complete macronutrient analytics, allergen detection, and authentic chef-curated recipes.
          </p>
          <div className="footer-badges">
            <span className="footer-mini-tag">🔒 100% Private</span>
            <span className="footer-mini-tag">⚡ Edge Inference</span>
            <span className="footer-mini-tag">🥗 12+ World Cuisines</span>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-column">
            <h4>Application</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
            <a href="#scanner" onClick={(e) => { e.preventDefault(); if (onStartScan) onStartScan(); }}>📸 Scan Meal</a>
            <button type="button" className="footer-link-btn" onClick={onOpenJournal}>🍽️ Meal Journal</button>
            <a href="#features">🌟 Features</a>
          </div>

          <div className="footer-column">
            <h4>Community</h4>
            <a href="https://github.com/GoodnewsCodes" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
            <a href="https://github.com/GoodnewsCodes/FoodLens" target="_blank" rel="noreferrer">
              Source Code
            </a>
            <a href="mailto:contact@foodlens.app">
              Contact Team
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FoodLens. Crafted for food and health enthusiasts worldwide.</p>
        <button type="button" className="back-to-top-btn" onClick={scrollToTop}>
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
