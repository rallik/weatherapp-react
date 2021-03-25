import React from 'react'
import {useGlobalContext} from '../context'

const Display = () => {
    const { currentWeather } = useGlobalContext();
    const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = currentWeather;
    // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
    console.log(currentWeather)
    return (
        <section>
            
        </section>
    )
}

export default Display
