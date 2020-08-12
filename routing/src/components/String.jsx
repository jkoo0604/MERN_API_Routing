import React from 'react';

const String = props => {
    const isStr = isNaN(+props.str);
    return (
        <>
        {
            isStr ? <h2>The word is: {props.str}</h2> : <h2>The number is: {props.str}</h2>
        }
        </>
    )
}

export default String;