import React, { useState, useEffect, useRef } from 'react';
import { Link, navigate } from '@reach/router';
import errorImg from '../Ben_Kenobi.png';
import axios from 'axios';

const Result2 = props => {
    const {resource, setResource, id, setId, submitted} = props;
    const [data, setData] = useState([]);
    const [isPerson, setIsPerson] = useState(0);
    const [homeworld, setHomeworld] = useState({});
    const [noResult, setNoResult] = useState(false);
    // console.log('inside results2',resource, id)
    useEffect(
        () => {
            // if (firstRender.current) {
            //     firstRender.current = false;
            //     return;
            // } else {
                console.log('making api call', resource, id);
                let newUrl = 'http://swapi.dev/api/' + resource + '/' + id;
                console.log(newUrl);
                axios.get(newUrl)
                .then(response => {
                    console.log(response.data);
                    setNoResult(false);
                    let hw = response.data.homeworld ? response.data.homeworld.substring(0,response.data.homeworld.length-1) : '';
                    resource === 'people' ? setHomeworld({'name': '', 'url': response.data.homeworld, 'id': hw.substring(hw.lastIndexOf('/')+1)}) : setHomeworld({}); 
                    resource === 'people' ? setIsPerson(isPerson===0 ? 1 : -1* isPerson) : setIsPerson(0);            
                    setData(Object.entries(response.data)); 
                })
                .catch(err => {
                    console.log(err);
                    setData([]);
                    setIsPerson(false);
                    setHomeworld({});
                    setNoResult(true);
                })
            // }
        }, [id, resource]
    )

    useEffect(
        () => {
            if (isPerson===0) {
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

    const handleClick = (e) => {
        e.preventDefault();
        setResource('planets');
        setId(homeworld.id);
        navigate(`/planets/${homeworld.id}`);
    }
    return(
        <div className="results">
            {
                noResult
                ? 
                <>
                    <div className="row error">
                        <div className="col text-center">
                            <p>
                            These aren't the droids you're looking for
                            </p>
                            <img src={errorImg} alt=""/>
                        </div>
                    </div>
                    <div className="row error">
                        <div className="col text-center">
                            <Link to="/"><button className="btn btn-outline-dark btn-sm">go back</button></Link>
                        </div>
                    </div>
                </>
                :
                <div className="row noerror">
                    <div className="col text-left">
                        <h3>{data.filter(item => item[0] === 'name').map(item => item[1])}</h3>
                        <table className="table table-sm table-hover">
                            <tbody>
                                {data.map((item, i) => {
                                    if (item[0]==='homeworld') {
                                        return <tr key={i}><td>{item[0]}:</td><td><Link to={`/planets/${homeworld.id}`} onClick={handleClick}>{homeworld.name}</Link></td></tr>
                                    } else if (Array.isArray(item[1])) {
                                        return <tr key={i}><td>{item[0]}:</td><td><ul>
                                            {item[1].map((k, j) => <li key={j}>{k}</li>)}
                                            </ul></td></tr>
                                    }
                                    return <tr key={i}><td>{item[0]}:</td><td>{item[1]}</td></tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Result2;