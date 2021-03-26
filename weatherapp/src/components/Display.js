import React from 'react';
import {useGlobalContext} from '../context'

const Display = () => {
    const { currentWeather } = useGlobalContext();
    const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = currentWeather;
    // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
    console.log(currentWeather)
    return (
        <React.Fragment>
            <section className='clouds'>
                <h2>Cloud Cover %</h2>
                <h3>{clouds.all}</h3>
            </section>
            <section className=''>

            </section>
        </React.Fragment>
    )
}

export default Display
