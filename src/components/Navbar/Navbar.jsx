import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const ACCESS_KEY = "tQjXSiMi5c5unpx9xb7SrargUnuPGuiIIkhvpSYWiM4";

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
  ]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query: e.target.value },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <div className="navbar-logo">
            <Link to="/">
              <img src="/src/assets/ms-icon.png" alt="Logo" />
            </Link>
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
            <Link to="/">Explore</Link>
            <Link to="/">Advertise</Link>
            <Link to="/">Get Unsplash+</Link>
          </div>
          <div className="navbar-actions">
            <button className="login-button">Log in</button>
            <button className="submit-button">Submit an image</button>
          </div>
        </div>
      </div>
      <div className="navbar-categories">
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <Link to={`/category/${category}`}>{category}</Link>
            {category === "Unsplash+" && <hr />}
          </React.Fragment>
        ))}
      </div>
      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.id} className="search-result">
            <img
              src={result.urls.thumb}
              alt={result.description || result.alt_description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
