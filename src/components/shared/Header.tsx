import React from "react";
import bushaL from "../../assets/busha_logo.png";
function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="nav-logo">
            <img src={bushaL} alt="logo" style={{ height: "1em" }} />
          </div>

          <div className="right">
            <div className="items">
              <p className="hidden md:block">
                <span className="avatar"> O </span>
              </p>
              <span className="hidden md:block">Oluwatobi Akindunjoye</span>
              <a href="#" className="block md:hidden">
                <span className="fa"></span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Header;
