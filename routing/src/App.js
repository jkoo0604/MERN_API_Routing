import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './components/Home';
import String from './components/String';
import StringStyled from './components/StringStyled';


function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/home" />
        <String path="/:str" />
        <StringStyled path="/:str/:color/:bgColor" />
      </Router>
    
    </div>
  );
}

export default App;
