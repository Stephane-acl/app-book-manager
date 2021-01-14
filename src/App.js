import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import React from "react";

function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <HomePage/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
