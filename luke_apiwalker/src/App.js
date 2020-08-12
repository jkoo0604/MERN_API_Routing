import React, { useState } from 'react';
import './App.css';
import { Router } from '@reach/router';
import InputForm from './components/InputForm2';
import Result from './components/Result2';

function App() {
  // const [data, setData] = useState([]);
  // const [noResult, setNoResult] = useState(false);
  // const [isPerson, setIsPerson] = useState(false);
  // const [homeworld, setHomeworld] = useState({});


  const [resource, setResource] = useState('');
  const [id, setId] = useState('');
  const [submitted, setSubmitted] = useState(0);


  return (
    <div className="App container">
      {/* <InputForm data={data} setData={setData} noResult={noResult} setNoResult={setNoResult} isPerson={isPerson} setIsPerson={setIsPerson} homeworld={homeworld} setHomeworld={setHomeworld}/>
      <Router>
        <Result path="/:resource/:id" data={data} noResult={noResult} isPerson={isPerson} homeworld={homeworld}/>
      </Router> */}
      <InputForm resource={resource} setResource={setResource} id={id} setId={setId} submitted={submitted} setSubmitted={setSubmitted}/>
      <Router>
        <Result path="/:resource/:id" resource={resource} setResource={setResource} id={id} setId={setId} submitted={submitted}/>
      </Router>
    </div>
  );
}

export default App;
