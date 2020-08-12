import React, { useState, useEffect, useRef } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const InputForm = props => {
    const {data, setData, noResult, setNoResult, isPerson, setIsPerson, homeworld, setHomeworld} = props;
    const [resource, setResource] = useState('');
    const [id, setID] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const firstRender = useRef(true);

    
    useEffect(
        () => {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            } else if (!submitted) {
                return;
            } else {
                console.log('making api call');
                axios.get(`http://swapi.dev/api/${resource}/${id}/`)
                .then(response => {
                    console.log(response.data);
                    let hw = response.data.homeworld.substring(0,response.data.homeworld.length-1);
                    resource === 'people' ? setHomeworld({'name': '', 'url': response.data.homeworld, 'id': '/planets/' + hw.substring(hw.lastIndexOf('/')+1)}) : setHomeworld({}); 
                    resource === 'people' ? setIsPerson(true) : setIsPerson(false);              
                    setData(Object.entries(response.data));
                })
                .catch(err => {
                    console.log(err);
                    setData([]);
                    setIsPerson(false);
                    setHomeworld({});
                    setNoResult(true);
                })
            }
        }, [submitted]
    )

    useEffect(
        () => {
            if (!isPerson) {
                return;
            } else {
                axios.get(homeworld.url)
                .then(response => {
                    console.log(response.data);
                    setHomeworld({...homeworld, 'name': response.data.name});
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }, [isPerson]
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // setSubmitted(false);
        navigate(`/${resource}/${id}`);
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-inline">
                <label htmlFor="resource" className="my-1 mr-2">Search for:</label>
                <select name="resource" className="custom-select my-1 mr-sm-2" onChange={(e) => setResource(e.target.value)}>
                    <option defaultValue>Choose</option>
                    <option value="people">People</option>
                    <option value="root">Root</option>
                    <option value="films">Films</option>
                    <option value="starships">Starships</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="species">Species</option>
                    <option value="planets">Planets</option>
                </select>
                <label htmlFor="id" className="my-1 mr-2">ID:</label>
                <input type="text" className="form-control mb-2 mr-sm-2" onChange={(e) => setID(e.target.value)}/>
                <button className="btn btn-dark btn-sm">Search</button>
            </form>
        </div>
    )

}
export default InputForm;