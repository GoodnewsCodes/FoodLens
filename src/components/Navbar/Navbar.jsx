import { useState, useEffect } from "react";
import logoImage from "../../assets/logo.png";
import "./Navbar.css";

function Navbar({ onStartScan }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (callback) => {
    setMenuOpen(false);
    if (callback) callback();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="#" className="brand" onClick={() => setMenuOpen(false)}>
          <img src={logoImage} alt="FoodLens Logo" className="brand-logo" />
          <span className="brand-name">FoodLens</span>
        </a>

        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <a
            href="#scanner"
            className="nav-link highlight"
            onClick={() => handleNavClick(onStartScan)}
          >
            📸 Scan Food
          </a>
          <a
            href="#features"
            className="nav-link"
            onClick={() => handleNavClick()}
          >
            Features
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={() => handleNavClick()}
          >
            About
          </a>
        </div>

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
    </nav>
  );
}

export default Navbar;
