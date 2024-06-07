
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Photo from './components/Photo/Photo'; 
import Navbar from './components/Navbar/Navbar'; 
import Cover from "./components/Cover/Cover";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
     <Cover/>
      </div>
    
      <Routes>
        <Route path="/" element={<Photo />} />
        <Route path="/category/:category" element={<Photo />} />
      </Routes>
    </Router>
  );
}

export default App;
