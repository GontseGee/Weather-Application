
import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SavedLocations from './Components/SavedLocations';
import './App.css';

const App = () => {
  const [savedLocations, setSavedLocations] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home savedLocations={savedLocations} setSavedLocations={setSavedLocations} />}
        />
        <Route
          path="/saved-locations"
          element={<SavedLocations savedLocations={savedLocations} setSavedLocations={setSavedLocations} />}
        />
      </Routes>
    </Router>
  );
};

export default App;