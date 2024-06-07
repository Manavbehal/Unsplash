
import React from 'react';
import './Cover.css';

const Cover = () => {
  return (
    <div className="cover-container">
      <div className="cover-left">
        <h1>Unsplash</h1>
        <p>The internet’s source for visuals.</p>
        <p>Powered by creators everywhere.</p>
        <div className="supported-by">
          <p>Supported by</p>
          <img src="xyz" alt="Squarespace" />
        </div>
        <div className="search-bar">
        <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <input type="text" placeholder="Search photos and illustrations" />
          <button className="visual-search-button">
            <i className="fas fa-camera"></i>
          </button>
        </div>
      </div>
      <div className="cover-right">
        <div className="info-box">
        <p><span className="bold-text">Yes, it’s really free.</span> All images can be downloaded and used for personal or commercial projects.</p>
          <a href="#">Learn about our License</a>
        </div>
        <div className="unsplash-plus">
          <p>Discover Unsplash+</p>
          <p>Unlimited downloads.</p>
          <p>Full legal protections.</p>
          <p>No ads.</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
