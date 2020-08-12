import React, { useState, useEffect, useRef} from 'react';

const PokemonApi = () => {
    const [buttonClicked, setButtonClicked] = useState();
    const [pokemonList, setPokemonList] = useState([]);
    const firstUpdate = useRef(true);

    useEffect(
        () => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
                return;
            } else {
                fetch('https://pokeapi.co/api/v2/pokemon?limit=807')
                .then(response => response.json())
                .then(response => {
                    let results = response.results.map(item => item.name)
                    setPokemonList(results)
                })
                .catch(err => { console.log(err) })
            }
        }, [buttonClicked]
    )

    const handleClick = () => {
        let temp = { 'status': 'clicked' };
        setButtonClicked(temp);
    }

    return (
        <div className="container">
            <button className="btn btn-dark btn-sm" onClick={handleClick}>Fetch List</button>
            <div className="pList">
                <ul>
                    {
                        pokemonList.map( (item, index) => <li key={index}>{item}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default PokemonApi;