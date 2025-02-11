import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sustainability from './pages/Sustainability';
import HowWeWork from './pages/HowWeWork';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
      </Routes>
    </Router>
  );
}

export default App;