import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './topbar.css';

export const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const redirect22 = () => {
    navigate("/homepage");
    setMenuOpen(false);
  };
  const redirect23 = () => {
    navigate("/places");
    setMenuOpen(false);
  };
  const redirect24 = () => {
    navigate("/food");
    setMenuOpen(false);
  };
  const redirect25 = () => {
    navigate("/accomadation");
    setMenuOpen(false);
  };

  // Toggle open class on hamburger click
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="topbar">
      <div className="right-menu">
        <div id="nav-icon1" className={menuOpen ? "open" : ""} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {menuOpen && (
          <div className="box-content">
            <ul id="menu">
              <li onClick={redirect22}><p>Home</p></li>
              <li onClick={redirect23}><p>Places</p></li>
              <li onClick={redirect24}><p>Food</p></li>
              <li onClick={redirect25}><p>Accommodation</p></li>
            </ul>
          </div>
        )}
      </div>
      <h1 className="heading">triPlanner</h1>
      <div className="gap"></div>
    </div>
  );
};
