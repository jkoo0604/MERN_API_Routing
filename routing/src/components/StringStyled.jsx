import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

const StringStyled = props => {
    // if (!isNaN(+props.str)) {
    //     navigate(`/${props.str}`);
    // }
    useEffect(
        () => {
            if (!isNaN(+props.str)) {
                navigate(`/${props.str}`, { replace: true });
            }
        }, []
    );
    
    return (
        <>
        {
           <h2 style={{color:props.color, backgroundColor:props.bgColor}}>The word is: {props.str}</h2>
        }
        </>
    )
}

export default StringStyled;