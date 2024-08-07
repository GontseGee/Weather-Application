
import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SavedLocations from './Components/SavedLocations';
import Navbar from './Components/Navbar';
import Settings from './Components/Settings';
import './App.css';


const App = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'app dark-mode' : 'app'}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home savedLocations={savedLocations} setSavedLocations={setSavedLocations} />} />
          <Route path="/saved" element={<SavedLocations savedLocations={savedLocations} setSavedLocations={setSavedLocations} />} />
          <Route path="/settings" element={<Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;