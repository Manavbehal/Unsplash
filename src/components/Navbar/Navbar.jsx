import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { api } from "../../Api"; // Import your API functions here

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
    </div>
  );
};

export default Navbar;
