import React from 'react';
import { useGlobalContext } from '../context';
import Weather from './Weather';
import Error from './Error';
import Welcome from './Welcome'
import Loading from './Loading'

const Display = () => {
    const { initialRender, loading, validLocation } = useGlobalContext();
    console.count('context - display');

/************************************************************
Currently breaks on initial render -> context first returns null
value for currentWeather and destructuring can't happen as a result
************************************************************/

    if (initialRender.current === true && validLocation.current === null) {
        return (
            <Welcome />
        );
    } else if (initialRender.current === false && loading === true) {
        return (
            <Loading/>
        );
    } else if (initialRender.current === false && validLocation.current === true && loading === false) {
        return (
            <Weather />
        )
    } else {
        console.log('error')
        return (
            <Error />
        );
    }
    
}

export default Display;
