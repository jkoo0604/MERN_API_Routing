import React, { useState, useEffect, useRef } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const InputForm2 = props => {
    const {resource, setResource, id, setId, submitted, setSubmitted} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(resource, id);
        setSubmitted(submitted===0 ? 1 : submitted * -1);
        // console.log(submitted);
        navigate(`/${resource}/${id}`);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-inline">
                <label htmlFor="resource" className="my-1 mr-2">Search for:</label>
                <select name="resource" className="form-control custom-select my-1 mr-sm-2" value={resource} onChange={(e) => setResource(e.target.value)}>
                    <option>Choose</option>
                    <option value="people">People</option>
                    <option value="films">Films</option>
                    <option value="starships">Starships</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="species">Species</option>
                    <option value="planets">Planets</option>
                </select>
                <div className="form-group">
                    <label htmlFor="id" className="my-1 mr-2">ID:</label>
                    <input type="text" className="form-control my-1 mr-sm-2" value={id} name="id" onChange={(e) => setId(e.target.value)}/>
                </div>
                <button className="btn btn-dark btn-sm">Search</button>
                <Link to="/"><button className="btn btn-outline-dark btn-sm">Back</button></Link>
            </form>
        </div>
    )

}
export default InputForm2;