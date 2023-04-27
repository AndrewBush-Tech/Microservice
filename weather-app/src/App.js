import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './pages/Weather';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
                <Link to="/"> Home </Link>
                <Link to="/page2"> Agenda </Link>
                <Link to="/page3"> Settings </Link>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
