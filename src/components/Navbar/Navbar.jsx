import { useState, useEffect } from "react";
import logoImage from "../../assets/logo.png";
import "./Navbar.css";

function Navbar({ onStartScan, onOpenJournal, mealCount = 0, onNavigateHome }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (action) => {
    setMenuOpen(false);
    if (action) action();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(onNavigateHome);
          }}
        >
          <img src={logoImage} alt="FoodLens Logo" className="brand-logo" />
          <div className="brand-text-group">
            <span className="brand-name">FoodLens</span>
            <span className="brand-tag">AI Vision</span>
          </div>
        </a>

        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <a
            href="#scanner"
            className="nav-link highlight"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onStartScan);
            }}
          >
            📸 Scan Food
          </a>

          <button
            type="button"
            className="nav-link journal-btn"
            onClick={() => handleNavClick(onOpenJournal)}
          >
            🍽️ Meal Log
            {mealCount > 0 && <span className="nav-counter">{mealCount}</span>}
          </button>

          <a
            href="#features"
            className="nav-link"
            onClick={() => {
              setMenuOpen(false);
              if (onNavigateHome) onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 60);
            }}
          >
            Features
          </a>

          <a
            href="#about"
            className="nav-link"
            onClick={() => {
              setMenuOpen(false);
              if (onNavigateHome) onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById("about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 60);
            }}
          >
            About
          </a>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-journal-quick-btn"
            onClick={onOpenJournal}
            title="Open Daily Meal Journal"
          >
            🍽️ <span className="journal-btn-text">Log</span>
            {mealCount > 0 && <span className="nav-counter">{mealCount}</span>}
          </button>

          <button
            className={`nav-toggle ${menuOpen ? "active" : ""}`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
