import "./Navbar.css";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <img src="logo.png" alt="🔍" height={35} width={35} />
          <a>FoodLens</a>
        </div>
        <div className="links">
          <a>Features</a>
          <a>About</a>
          <a>Sponsor</a>
        </div>
        <div
          className="nav-toggle"
          aria-label="Toggle Navigation Menu"
          onClick={() => {}}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
