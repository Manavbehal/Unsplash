import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { api } from "../../Api"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    // Define a function to debounce API requests
    const debounce = (func, delay) => {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    // Function to fetch photos from the API
    const fetchPhotos = async () => {
      try {
        // Send request to API with the searchTerm
        const response = await api.photos.search({ query: searchTerm });
        // Handle response and update the Photo component accordingly
        // Example: setPhotos(response.data)
        console.log("Photos:", response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    // Debounce the fetchPhotos function with a delay of 500 milliseconds
    const debouncedFetchPhotos = debounce(fetchPhotos, 500);

    // Trigger the debouncedFetchPhotos function when searchTerm changes
    if (searchTerm) {
      debouncedFetchPhotos();
    }

    // Clean up
    return () => {
      clearTimeout(debouncedFetchPhotos);
    };
  }, [searchTerm]);

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
          <div className="hidden-1">
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faBars} />
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
