
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import SavedLocations from './pages/SavedLocations';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/saved-locations" component={SavedLocations} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
