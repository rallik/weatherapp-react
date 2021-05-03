import React from 'react';
import { useGlobalContext } from '../context';
import Weather from './Weather';
import Error from './Error';
import Welcome from './Welcome'
import Loading from './Loading'

const Switch = () => {
    const { initialRender, loading, validLocation } = useGlobalContext();
    console.count('context - display');

/************************************************************
Can still submit same place 2x, sticks on loading view
************************************************************/
    
    console.log('display if: ', initialRender.current, validLocation.current, loading)

    if (initialRender.current === true && validLocation.current === null && loading === false) {
        return (
            <Welcome />
        );
    } else if (initialRender.current === false && validLocation.current !== false && loading === true) {
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

const Display = () => {
    return (
        <section className='data'>
            <Switch />
        </section>
    )
    
}

export default Display;
