import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set loading to false after the location changes
    //set two seconds to simulate the loading
    setLoading(false);
  }, [location]);

  const handleClick = (path) => {
    setLoading(true);
    navigate(path);
  };

  return (
    <div className="App-header">
      <header>
        <div className="nav nav-left"></div>
        <div className="nav nav-center">
          {loading && <div className="loading-spinner">Loading...</div>}
          <div>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => handleClick("/")}>
              <p>
                <strong>HOME</strong>
              </p>
            </Link>
          </div>
          <div>
            <Link to="/catalog" className={location.pathname === "/catalog" ? "active" : ""} onClick={() => handleClick("/catalog")}>
              <p>
                <strong>CATALOG</strong>
              </p>
            </Link>
          </div>
          <div>
            <Link to="/gift-boxes" className={location.pathname === "/gift-boxes" ? "active" : ""} onClick={() => handleClick("/gift-boxes")}>
              <p>
                <strong>GIFT BOXES</strong>
              </p>
            </Link>
          </div>
          <div>
            <Link to="/contact-us" className={location.pathname === "/contact-us" ? "active" : ""} onClick={() => handleClick("/contact-us")}>
              <p>
                <strong>CONTACT US</strong>
              </p>
            </Link>
          </div>
          <div>
            <Link to="https://www.doordash.com/convenience/store/27766771/?event_type=autocomplete&pickup=false" target="_blank">
              <p>
                DOORDASH
              </p>
            </Link>
          </div>
        </div>
        <div className="nav nav-right">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
      </header>
    </div>
  );
}

export default Header;
