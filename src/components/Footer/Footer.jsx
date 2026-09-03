import logoImage from "../../assets/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <img src={logoImage} alt="FoodLens Logo" height={30} width={30} />
            <span className="footer-logo-text">FoodLens</span>
          </div>
          <p className="footer-tagline">
            Instant AI food identification, complete nutritional analytics, and step-by-step recipes.
          </p>
        </div>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#scanner">Scan Food</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FoodLens. Built for food & health enthusiasts.</p>
      </div>
    </footer>
  );
}

export default Footer;
