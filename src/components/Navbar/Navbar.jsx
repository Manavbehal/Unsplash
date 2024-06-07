// src/Navbar.js
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories] = useState([
    "Editorial",
    "Unsplash+",
    "Pastels",
    "Wallpapers",
    "Nature",
    "3D Renders",
    "Travel",
    "Architecture & Interiors",
    "Textures & Patterns",
    "Street Photography",
    "Film",
    "Archival",
    "Experimental",
    "Animals",
    "Fashion & Beauty",
    "People",
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <div className="navbar-logo">
            {/* Add your logo here */}
            <img src="/src/assets/ms-icon.png" alt="Logo" />
          </div>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search photos and illustrations"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            <a href="/">Explore</a>
            <a href="/">Advertise</a>
            <a href="/">Get Unsplash+</a>
          </div>
          <div className="navbar-actions">
            <button className="login-button">Log in</button>
            <button className="submit-button">Submit an image</button>
          </div>
        </div>
      </div>
      <div className="navbar-categories">
        {categories.map((category, index) => (
          <a href={`#${category}`} key={index}>
            {category}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
