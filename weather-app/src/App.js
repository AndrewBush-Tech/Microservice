import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './pages/Weather';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Monday from './pages/Monday';
import Tuesday from './pages/Tuesday';
import Wednesday from './pages/Wednesday';
import Thursday from './pages/Thursday';
import Friday from './pages/Friday';
import Saturday from './pages/Saturday';
import Sunday from './pages/Sunday';
import WeatherMap from './pages/WeatherMap';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/"> Home </Link></li>
            <li><Link to="/page2"> Agenda </Link></li>
            <li><Link to="/page3"> Map </Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/Monday/:city" element={<Monday />} />
          <Route path="/Tuesday/:city" element={<Tuesday />} />
          <Route path="/Wednesday/:city" element={<Wednesday />} />
          <Route path="/Thursday/:city" element={<Thursday />} />
          <Route path="/Friday/:city" element={<Friday />} />
          <Route path="/Saturday/:city" element={<Saturday />} />
          <Route path="/Sunday/:city" element={<Sunday />} />
          <Route path="/WeatherMap" element={<WeatherMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
