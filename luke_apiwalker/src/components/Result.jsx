import React, { useState } from 'react';
import { Link } from '@reach/router';
import errorImg from '../Ben_Kenobi.png';

const Result = props => {
    const {data, noResult, isPerson, homeworld} = props;
    const name = !noResult ? data.filter(item => item[0] === 'name') : '';
    return(
        <>
            {
                noResult
                ? 
                <div className="row error">
                    <div className="col text-center">
                        <p>
                        These aren't the droids you're looking for
                        </p>
                        <img src={errorImg} alt=""/>
                    </div>
                    <div className="col">
                        <Link to="/"><button className="btn btn-outline-dark btn-sm">go back</button></Link>
                    </div>
                </div>
                :
                <div className="row noerror">
                    <div className="col text-left">
                        <h3>{data.filter(item => item[0] === 'name').map(item => item[1])}</h3>
                        <table className="table table-sm table-hover">
                            <tbody>
                                {data.map((item, i) => {
                                    if (item[0]==='homeworld') {
                                        return <tr key={i}><td>{item[0]}:</td><td><Link to={homeworld.id}>{homeworld.name}</Link></td></tr>
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
        </>
    )
}

export default Result;