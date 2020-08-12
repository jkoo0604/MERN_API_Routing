import React from 'react';
import './App.css';
import PokemonApi from './components/PokemonApi';
import PokemonAxios from './components/PokemonAxios';

function App() {
  return (
    <div className="App">
      {/* <PokemonApi/> */}
    <PokemonAxios/>
    </div>
  );
}

export default App;
